//파일 불러오기
let img1, img2, img3;
function preload()
{
  //이미지
  img1 = loadImage('./plus/크르키 로고.png');
  img2 = loadImage('./plus/크르키 로고2.png');
  img3 = loadImage('./plus/지뢰찾기 깃발.png');
  
  //소리
}

//화면 
let easy=0, normal=0, hard=0, infromation=0;

//버튼
let B_home; //시작화면으로 가는 버튼
let B_easy, B_normal, B_hard; //난이도 선택 버튼
let B_infromation; //게임정보 버튼

//점수 초
let tick=0, score=0, E_high=-1, N_high=-1, H_high=-1;

//점수 승률
let win=0, lose=1;

//칸(맵)
let mw, mh, ms; //칸 가로 세로 길이, easy=9*9, normal=16*16, normal=30*16
let m = [], B_m = [];
let boom; //지뢰

let w;

function setup()
{
  createCanvas(600, 600);
  
  //버튼 생성
  B_home = createButton('home');
  B_home.size(150, 50);
  B_home.style('font-size', '25px');
  B_easy = createButton('Easy');
  B_easy.size(180, 80);
  B_easy.style('font-size', '30px');
  B_normal = createButton('Normal');
  B_normal.size(180, 80);
  B_normal.style('font-size', '30px');
  B_hard = createButton('Hard');
  B_hard.size(180, 80);
  B_hard.style('font-size', '30px');
  B_infromation = createButton('i');
  B_infromation.size(50, 50);
  B_infromation.style('font-size', '40px');
  for(let i=0; i<480; i++)
    B_m[i] = createButton('');
}

//버튼 속성
function home_B(){
  B_home.position(width, 0);
  for(let i=0; i<480; i++)
    B_m[i].position(width, 0);
  easy=0, normal=0, hard=0, infromation=0;
}
function infromation_B(){
  B_easy.position(width, 0), B_normal.position(width, 0), B_hard.position(width, 0), B_infromation.position(width, 0);
  easy=0, normal=0, hard=0, infromation=1;
}
function easy_B(){
  B_easy.position(width, 0), B_normal.position(width, 0), B_hard.position(width, 0), B_infromation.position(width, 0);
  easy=1, normal=0, hard=0, infromation=0;
  mw = 9, mh = 9, ms=(width-100)/9, boom = 10;
  for(let i=50, k=0; i<width-50-ms; i+=ms)
    for(let j=50; j<height-50-ms; j+=ms, k++)
      {
        B_m[k].size(ms, ms);
        B_m[k].position(j, i);
      }
  for(let i=0, j; i<boom;)
    {
      j=random(0, mw*mh-1);
      if(!m[j])m[j]=1, i++;
    }
}
function normal_B(){
  B_easy.position(width, 0), B_normal.position(width, 0), B_hard.position(width, 0), B_infromation.position(width, 0);
  easy=0, normal=1, hard=0, infromation=0;
  mw = 16, mh = 16, ms=(width-100)/16, boom = 40;
  for(let i=100, k=0; i<width-ms; i+=ms)
    for(let j=50; j<height-50-ms; j+=ms, k++)
    {
        B_m[k].size(ms, ms);
        B_m[k].position(j, i);
    }
  for(let i=0, j; i<boom;)
  {
      j=random(0, mw*mh-1);
      if(!m[j])m[j]=1, i++;
  }
}
function hard_B(){
  B_easy.position(width, 0), B_normal.position(width, 0), B_hard.position(width, 0), B_infromation.position(width, 0);
  easy=0, normal=0, hard=1, infromation=0;
  mw = 30, mh = 16, ms=(width-10)/30, boom=99;
  for(let i=100, k=0; i<width-ms; i+=ms)
    for(let j=5; j<height-ms; j+=ms, k++)
      {
        B_m[k].size(ms, ms);
        B_m[k].position(j, i);
      }
  for(let i=0, j; i<boom;)
    {
      j=random(0, mw*mh-1);
      if(!m[j])m[j]=1, i++;
    }
}
function button(){
  B_m[w].position(width, 0);
  if(m[w])//지뢰일 경우 게임 실패
  {
    for(let i=0; i<mw*mh; i++)
      if(m[i])B_m[i].position(width, 0);
  }
}


function draw()
{
  
  //시작화면
  if(!easy&&!normal&&!hard&&!infromation)
  {
    background(220);
    textSize(50);
    text('Minesweeper!', width/2-150, 100);
    textSize(30);
    text('made by Curukey', width/2-150, 130);
    image(img2, width/2-100, height/2, 110, 50);
    image(img3, width/2-150, height/2-140, 300, 200);
    //버튼위치 설정
    B_easy.position(width/2-270, height-100);
    B_normal.position(width/2-90, height-100);
    B_hard.position(width/2+90, height-100);
    B_infromation.position(width-120, height/2);
    B_easy.mousePressed(easy_B);
    B_normal.mousePressed(normal_B);
    B_hard.mousePressed(hard_B);
    B_infromation.mousePressed(infromation_B);
    
  }
  
  //게임안내화면
  if(infromation)
  {
    background(220);
    textSize(30);
    text('【게임방법】', 30, 100);
    textSize(20);
    text('1. Easy, Normal, Hard중 게임 난이도를 선택한다.\n2. 지뢰를 클릭할시 게임은 종료된다.\n3. 숫자를 통하여 근처 8칸에 지뢰개수를 알 수 있다.\n4. 단서를 통해 지뢰위치에 우클릭을 하여 깃발을 세운다.\n5. 모든 지뢰를 모두 찾는 것이 이 게임의 목표이다.', 30, 150);
    textSize(30);
    text('【개발자】', 30, 350);
    textSize(20);
    text('개발자 닉네임 : Curukey\n이 게임은 p5.js로 제작하였습니다.\n이미지는 Adobe Illustartor로 Curukey가 제작한 것 입니다.', 30, 400);
    image(img1, 400, 320, 100, 100);
    B_home.position(width-200, 500);
    B_home.mousePressed(home_B);
  }
  
  //게임화면
  if(easy||normal||hard)
  {
    //초세기(스톱워치) 표시
    background(220);
    tick++;
    if(tick==60)tick=0, score++;
    textSize(25);
    text('Time : '+score, 10, 40);
    //최고기록 표시
    if(easy)
      {
        mw = 9, mh = 9;
        if(E_high==-1)text('highscore : 없음', 160, 40);
        else text('highscore : '+E_high, 200, 40);
      }
    if(normal)
      {
        if(N_high==-1)text('highscore : 없음', 160, 40);
        else text('highscore : '+N_high, 200, 40);
      }
    if(hard)
      {
        if(H_high==-1)text('highscore : 없음', 160, 40);
        else text('highscore : '+H_high, 200, 40);
      }
    //지뢰 수 표시
    text('bomb : '+boom, 400, 40);
    
    //게임진행코드
    for(let w=0; w<mw*mh; w++)
        B_m[w].mousePressed(button);
    
    
    
  }
}