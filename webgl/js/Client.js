Client = function( _p, _options ) {
    this.connection;
    this.bConnected;
    this.sid;
    this.events = {};

    var self = this;
    var parent = _p;

    for( o in _options ) {
        self[o] = _options[o];
    }

    if( !self.secure ) {
        self.ws_url = "ws://"+self.host+":"+self.port+"/"+self.roomname+"/"+self.username;
    } else {
        self.ws_url = "wss://"+self.host+":"+self.port+"/"+self.roomname+"/"+self.username;
    }

    this.addEvent = function( _name, _type, _function ) {
        self.events[_name] = {
            e: _function,
            t: _type
        }
    }

    this.onWelcome = function(msg) {
        self.sid = msg["data"].toString();
        self.register();
    }

    this.register = function() {
        var msg = self.createMessage( "register", self.sid );
        if( self.debug ) {
            console.log( msg );    
        }
        self.sendMessage( msg );
    }

    this.createMessage = function( _type, _msg ) {
        var obj = {
            username: self.username,
            roomname: self.roomname,
            sid: self.sid,
            type: _type,
            msg: _msg
        }
        return obj;
    }

    this.sendMessage = function(msg) {
        self.connection.send(JSON.stringify(msg));
    }

    this.onPing = function() {
        var msg = {"type":"pong"}
        self.sendMessage(msg);
    }

    this.connect = function() {
        if ("WebSocket" in window) {
            self.connection = new ReconnectingWebSocket( self.ws_url );
            //self.connection = new WebSocket( self.ws_url );
        }

        this.connection.onmessage = function( event ) {
            try {
                self.parseMessage( JSON.parse(event.data) );
            } catch (err) {}
        }

        this.connection.onopen = function( event ) {
            self.bConnected = true;
        }

        this.connection.onclose = function( event ) {
            self.bConnected = false;
        }
    }

    this.parseMessage = function( msg ) {
        if( self.debug ) {
            console.log( msg );
        }
        if( msg["type"] ) {
            if( msg["type"] == "welcome" ) {
                self.onWelcome( msg );
            } else if( msg["type"] == "register" && msg["sid"] != self.sid ) {
            } else if( msg["type"] == "leave") {
            } else if( msg["type"] == "ping" ) {
                self.onPing();
            } else if( msg["sid"] && msg["sid"] != self.sid ) {
                var type = msg["type"];
                var message = msg["msg"];
                var bid = msg["bid"];

                if( self.events[type] ) {
                    if( typeof msg["msg"] == self.events[type].t || self.events[type].t == "any" ) {
                        self.events[type].e(message, bid);
                    }
                }
            }
        }
    }
};