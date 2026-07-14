'use strict'; // 「厳格モード」：おかしな書き方をしたらすぐエラーにしてね、という宣言

// --- 1. 画面のパーツ（HTMLの要素）をJavaScriptに連れてくる ---
const userNameInput = document.getElementById('user-name');       // 名前を入力するテキストボックスを取得
const assessmentButton = document.getElementById('assessment');   // 「診断する」ボタンを取得
const resultDivision = document.getElementById('result-area');   // 診断結果を表示するエリア（空の箱）を取得
const tweetDivision = document.getElementById('tweet-area');     // ツイートボタンを表示するエリア（空の箱）を取得

// --- 2. 「診断する」ボタンが押されたときの動き ---
assessmentButton.addEventListener(
  'click', // ボタンが「クリック」されたら、
  function () { // 以下の { から } までの処理を実行してね
    const userName = userNameInput.value; // 入力された名前（文字）を読み取って「userName」に保存

    if (userName.length === 0) {
      // もし名前の文字数が 0（空っぽ）だったら
      return; // この先の処理は何もせずに、ここで終わりにする（関数を抜ける）
    }

    // 新しく診断し直すために、前回の診断結果とツイートボタンを一旦消して画面を綺麗にする
    resultDivision.innerText = ''; // 診断結果エリアの文字を空っぽにする
    tweetDivision.innerText = '';   // ツイートエリアの文字を空っぽにする

    // 🌟【最重要】下にある診断の仕組み（関数）を呼び出して、診断結果の文章を作って「result」に保存する
    const result = assessment(userName);


    // --- 3. Bootstrapを使って、綺麗な「診断結果カード」を組み立てる ---
    
    // カードの「ヘッダー（青い屋根）」部分を作る
    const headerDivision = document.createElement('div'); // 新しく div タグ（箱）を作る
    headerDivision.setAttribute('class', 'card-header text-bg-danger'); // Bootstrapのクラス（青い背景に白い文字）を設定
    headerDivision.innerText = '診断結果'; // ヘッダーの中に「診断結果」という文字を入れる

    // カードの「ボディ（白いお腹）」部分を作る
    const bodyDivision = document.createElement('div'); // 新しく div タグ（箱）を作る
    bodyDivision.setAttribute('class', 'card-body'); // Bootstrapのクラス（カードの中身用）を設定

    // 診断結果の文章を入れる「段落」を作る
    const paragraph = document.createElement('p'); // 新しく p タグ（文章用）を作る
    paragraph.setAttribute('class', 'card-text'); // Bootstrapのクラス（カードの本文用）を設定
    paragraph.innerText = result; // さっき作った診断結果の文章（result）を中に入れる
    bodyDivision.appendChild(paragraph); // 本文用の p タグを、ボディ（白いお腹）の中に詰め込む

    // 大元の表示エリア（result-area）自体を「カード」に変身させる
    resultDivision.setAttribute('class', 'card'); // Bootstrapのクラス（カード全体の枠線）を設定

    // 完成した「ヘッダー」と「ボディ」を、大元の表示エリアに順番に差し込む（これで画面に見えるようになる）
    resultDivision.appendChild(headerDivision); // ヘッダー（青い屋根）を合体！
    resultDivision.appendChild(bodyDivision);   // ボディ（白いお腹）を合体！


    // --- 4. X（旧Twitter）のツイートボタンを組み立てる ---
    
    const anchor = document.createElement('a'); // リンク（aタグ）を新しく作る
    const hrefValue = // ボタンを押した時に飛ぶ、X専用の長いURL（呪文）を作る
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') + // 「#あなたのいいところ」というハッシュタグをURL用に変換
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue); // aタグに、今作ったリンク先URLを設定
    anchor.setAttribute('class', 'twitter-hashtag-button'); // X公式のボタンのデザインにするためのクラスを設定
    anchor.setAttribute('data-text', result); // ツイート本文に、診断結果の文章（result）が自動で入るように設定
    anchor.innerText = 'あなたのいいところをポストする'; // ボタンに表示される文字を設定

    tweetDivision.appendChild(anchor); // 完成したリンク（ボタン）を、ツイートエリアに合体！

    // Xのボタンを「ただのリンク」から「公式のカッコいいデザイン」に変身させるためのスクリプト（魔法の粉）を読み込む
    const script = document.createElement('script'); // scriptタグを新しく作る
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js'); // X公式のプログラムの場所を設定
    tweetDivision.appendChild(script); // スクリプトをツイートエリアに合体させて実行する

    console.log(result); // 念のため、開発者ツールのコンソールにも診断結果を出力しておく
  }
);

// --- 5. 名前を入力中に「Enterキー」を押しても診断できるようにする ---
userNameInput.addEventListener(
  'keydown', // キーボードのキーが「押し下げられた」ら、
  (event) => { // 以下の処理を実行
    if(event.code === 'Enter') { // もし押されたキーが「Enterキー」だったら
      assessmentButton.dispatchEvent(new Event('click')) // 「診断する」ボタンがクリックされた時と全く同じイベントを強制的に発生させる
    }
  }
)

// --- 6. 診断結果の「元ネタ」リスト（配列） ---
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
  '###userName###のいいところは優しさです。###userName###の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * --- 7. 名前を数字に変換して、診断結果の文章を1つ選ぶ「関数（仕組み）」 ---
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果の文章
 */
function assessment(userName) {
  let sumOfCharCode = 0; // 文字のコード番号の合計を入れるための変数（最初は0）を用意
  
  // 名前の文字を1文字ずつ取り出して、コンピュータ用の数字（コード番号）に変換して足していく
  for (let i = 0; i < userName.length; i++) { // 名前の長さの分だけ、繰り返し処理を行う
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i); // i番目の文字のコード番号を合計にプラスする
  }

  // 文字のコード番号の合計を、回答の数（16個）で割った「余り」を計算して、何番目の文章を使うか（0〜15）を決める
  const index = sumOfCharCode % answers.length; 
  let result = answers[index]; // リストから選ばれた文章を「result」にコピーする

  // 文章の中にある「###userName###」という目印を、実際の「ユーザーの名前」に丸ごと置き換える
  result = result.replaceAll('###userName###', userName); 
  return result; // 完成した診断結果の文章を、呼び出し元（ボタンを押したところ）に返す
}

// --- 8. プログラムが正しく動いているか自動でチェックする「テスト関数」 ---
function test() {
  console.log('診断結果の文章のテスト'); // テスト開始の合図をコンソールに出す

  //「太郎」という名前でテスト
  console.log('太郎');
  console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。', // 計算結果がこれになるはず！
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。' // もし違ったらコンソールにこのエラーを出してね
  );

  //「次郎」という名前でテスト
  console.log('次郎');
  console.assert(
    assessment('次郎') === '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //「花子」という名前でテスト
  console.log('花子');
  console.assert(
    assessment('花子') === '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  
  console.log('診断結果の文章のテスト終了'); // テストが無事に終わった合図をコンソールに出す
}

// 最後に、このファイルが読み込まれた瞬間に上記のテストを自動で1回実行する
test();
