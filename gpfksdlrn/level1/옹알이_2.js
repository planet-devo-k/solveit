// https://school.programmers.co.kr/learn/courses/30/lessons/133499

function solution(babbling) {
  const sounds = ['aya', 'ye', 'woo', 'ma'];

  const canSay = (word) => {
    let i = 0;
    let prev = '';

    while (i < word.length) {
      const sound = sounds.find((s) => s !== prev && word.startsWith(s, i));
      if (!sound) return false;

      i += sound.length;
      prev = sound;
    }

    return true;
  };

  return babbling.filter(canSay).length;
}
