// ==UserScript==
// @name         ResumeTwitch2000Error
// @namespace    http://unote.hatenablog.com/
// @version      1.0.0
// @description  ResumeTwitch2000Error
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

/*
    The MIT License (MIT)

    Copyright (c) 2015 bpyamasinn.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    */


(function() {
  'use strict';

  window.onload = function(){
    //監視オプションの作成
    const options = {
      childList: true,
      attributes: false,
      characterData: false,
    };

    // 監視ターゲットの取得
    // memo: multitwitchも対応するつもりだったけどクロスドメインでダメだった
    // const players = document.getElementsByClassName("player-root");
    // let observers = [];
    // let cnt = 0;
    // Array.from(players, (player) => {
    //   console.log(player);
    //   observers.push(new MutationObserver(records => {
    //       records.forEach(record => {
    //         console.log(record);
    //         Array.from(record.addedNodes)
    //           .filter(node => node.classList.contains('pl-error'))
    //           .some(node => {
    //             console.log('error!!');
    //             const playBtn = document.getElementsByClassName('player-button')[0];
    //             playBtn.click();
    //             return true;
    //           });
    //       });
    //   }));
    //   //監視の開始
    //   observers[cnt++].observe(player, options);
    //
    // });

    const player = document.querySelector('.player-root');
    const playBtn = document.querySelector('button.qa-pause-play-button');
    const observer = new MutationObserver(records => {
        records.forEach(record => {
          Array.from(record.addedNodes)
            .filter(node => node.classList.contains('pl-error'))
            .some(node => {
              console.log('error!!');
              playBtn.click();
              return true;
            });
        });
    });

    // 監視の開始
    observer.observe(player, options);

    // 自分で一時停止を押した場合は監視を停止
    playBtn.addEventListener('click', e => {
      const isStop = document.querySelector('.player-play-overlay');
      if (isStop != null){
        observer.disconnect();
      }else{
        observer.observe(player, options);
      }
    });

  };

})();
