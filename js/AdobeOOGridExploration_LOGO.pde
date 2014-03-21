Block[] blocks = new Block[11];

PImage mask;

void setup() {
  size( 772, 275 );

  smooth();
  noStroke();

  mask = loadImage("./img/logo_mask.png");

  blocks[0] = new Block( 88, 18, 76, 96 );
  blocks[1] = new Block( 214, 18, 86, 96 );
  blocks[2] = new Block( 340, 18, 99, 96 );
  blocks[3] = new Block( 482, 18, 80, 96 );
  blocks[4] = new Block( 602, 18, 83, 96 );
  
  blocks[5] = new Block( 32, 163, 76, 96 );
  blocks[6] = new Block( 163, 163, 76, 96 );
  blocks[7] = new Block( 267, 163, 76, 96 );
  blocks[8] = new Block( 410, 163, 76, 96 );
  blocks[9] = new Block( 548, 163, 76, 96 );
  blocks[10] = new Block( 670, 163, 76, 96 );

  background( 45,45,45 );

  frameRate( 20 );
}

void draw() {
  background( 45,45,45 );

  for ( int i = 0; i < blocks.length; i++ ) {
    blocks[i].update();
    blocks[i].render();
  }
  
  image( mask, 0, 0 );
}

class Block {
  int x, y;
  int w, h;
  
  color c, c1, c2;
  
  float v, s;
  
  Block ( int _x, int _y, int _w, int _h ) {
    x = _x;
    y = _y;
    w = _w;
    h = _h;
    
    s = 0;
    v = random(0,.2);
  
    c1 = color(45,45,45);
    c2 = color( int(random(0,255)), int(random(0,255)), int(random(0,255)) );
  }
  
  void setColor( int r, int g, int b ) {
    c = color( r, g, b );
  }
  
  void setColor( String r, String g, String b ) {
    c = color( int(r), int(g), int(b) );
  }
  
  void update() {

      s += v;
      if( s <= 1 ) {
        c = lerpColor( c1, c2, s );  
      } else {
       
       s = 0;
       v = random(0,.1);
       c1 = c2;
       c2 = color( int(random(0,255)), int(random(0,255)), int(random(0,255)) );
      }

  }
  
  void render() {
    fill( c );
    rect( x, y, w, h );
  }
}