'use strict';

{
  // 利用上の注意の作成
  const method = document.getElementById('method');
  const attention = document.getElementById('attention');
  const masking = document.getElementById('masking');

  method.addEventListener('click', () => {
    attention.classList.remove('hidden');
    masking.classList.remove('hidden');
  });
  
  masking.addEventListener('click', () => {
    attention.classList.add('hidden');
    masking.classList.add('hidden');
  });

  // タブメニュー、メニュー内ボタンの作成
  const menuItems = document.querySelectorAll('.menu li a');
  const contents = document.querySelectorAll('.content');

  menuItems.forEach(clickedItem => {
    clickedItem.addEventListener('click', e => {
      e.preventDefault();

      menuItems.forEach(item => {
        item.classList.remove('active');
      });
      clickedItem.classList.add('active');

      contents.forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(clickedItem.dataset.id).classList.add('active');
    });
  });

  const btn1 = document.getElementById('btn1');
  const btn2 = document.getElementById('btn2');
  const btn3 = document.getElementById('btn3');
  let btnNum = 0;

  btn1.addEventListener('click', () => {
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');
    words = [...Props.key1];
    timeLimit = 60 * 1000;
    btnNum = 1;
    reset();
  });

  btn2.addEventListener('click', () => {
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');
    words = [...Props.key2];
    timeLimit = 80 * 1000;
    btnNum = 2;
    reset();
  });

  btn3.addEventListener('click', () => {
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');  
    words = [...Props.key3];  
    timeLimit = 120 * 1000;
    btnNum = 3;
    reset()
  });

  function reset() {
    exit.classList.remove('inactive');
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    exitComp = false;
  }

  // タイピング画面の作成
  const Props = {
    key1:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    key2:['man','sea','blue','middle','set','study','woman','head','mountain','view','sight','volcano','happy','beautiful','cloudy','rainy','fantasy','english','soccor','baseball','swimming','computer','piano','fish','accounting','business','picture','phone','America','desk','chair','calender','book','economic','tree','graduation'],
    key3:['dream are necessary to life','everything is practice','if you want to be happy,be','change before you have to', 'love the life you live', 'peace begins with a smile', 'love dies only when growth stops', 'without haste,but without rest', 'think rich,look poor', 'always be honest', 'appearances are deceptive', 'boys be ambitious', 'celebrate your victories', 'clarity precedes success', 'failure teaches success']
  };
  
  let words = [];
  let word;
  let loc = 0;
  let score = 0;
  let miss = 0;
  let timeLimit = 0;
  let startTime;
  let pressTime;
  let isPlaying;
  let exitComp = false;
  const mask = document.getElementById('mask');
  const modal = document.getElementById('modal');
  const exit = document.getElementById('exit');
  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  const boxContainer = document.getElementById('boxContainer');
  
  // 結果表示の設定
  function showResult() {
    const accuracy = score + miss === 0 ? 0: score / (score + miss) * 100;
    alert(`正解タイプ数: ${score + miss}回, ミスタイプ数: ${miss}回, 正答率: ${accuracy.toFixed(1)}% `);
  }
  
  // プレイ中タイマーの設定
  function updateTimer() {
    let timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(0);
    
    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);
     
    if(timeLeft < 0 || exitComp === true){
      isPlaying = false;
      words = [];
      
      clearTimeout(timeoutId);
      timerLabel.textContent = '0';

      setTimeout(() => {
        showResult();
        reset();
        switch(btnNum){
          case 1: words = [...Props.key1];
                  break;
          case 2: words = [...Props.key2];
                  break;
          case 3: words = [...Props.key3];
                  break;
          default:
                  break;    
        }
      }, 100);
      
      if(exitComp === true){
        target.textContent = 'クリックして開始';
        exitComp = false;
      }
      else {
        target.textContent = 'クリックしてリプレイ！';
      }

      target.classList.add('desine1');
      target.classList.add('desine2');
      target.classList.add('desine3');
    }
  }
  
  // 開始前カウントの設定
  function countTimer() {
    const countTime = 3.4 * 1000;
    const threeCount = pressTime + countTime - Date.now();
    target.textContent = (threeCount / 1000).toFixed(0);
    
    const counttimeoutId = setTimeout(() => {
      countTimer();
    }, 10);
    
    if(threeCount < 0.5 * 1000){
      clearTimeout(counttimeoutId);
      
      exit.classList.remove('inactive');
      
      if(btnNum === 1 || btnNum === 2){
        target.classList.remove('desine2');
      }
      else {
        target.classList.remove('desine2');
        target.classList.remove('desine1');
      }
      
      word = words[Math.floor(Math.random() * words.length)];
      
      target.textContent = word;
      startTime = Date.now();
      updateTimer();
    }
  }

  // 入力完了文字の表示
  function updateTarget() {
    let placeholder = '';
    for(let i = 0; i < loc; i++){
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

  // 入力時の設定
  window.addEventListener('keydown', e => {
    if(isPlaying === false){
      return;
    }
    if(e.key === word[loc]){
      loc++;
      if(loc === word.length){
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    }
    else {
      miss++;
      missLabel.textContent = miss;
    }
  });
  
  // クリック時の設定
  boxContainer.addEventListener('click', () => {
    if(isPlaying === true){
      return;
    }
    isPlaying = true;
    
    exit.addEventListener('click', () => {
      if(exit.classList.contains('inactive') === true){
        return;
      }
      modal.classList.add('hidden');
      mask.classList.add('hidden');
      exitComp = true;
    });
    
    exit.classList.add('inactive');
    
    setTimeout(() => {
      target.classList.remove('desine3');
      pressTime = Date.now();
      countTimer();
    }, 1000);
  });
  
  // 終了ボタンの設定
  exit.addEventListener('click', () => {
    if(exit.classList.contains('inactive') === true){
      return;
    }
    modal.classList.add('hidden');
    mask.classList.add('hidden');
    exitComp = true;
  });
}