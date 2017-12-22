# WK Leech Trainer

In order to learn about the [Web Extensions API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions), I'm
rewriting the [Wanikani Leech Trainer Script](https://community.wanikani.com/t/leech-training-script/21699).

## Development

In order to use more modern JavaScript features, I'm writing it in ES6 and transpiling using Babel. To development,
download, run `yarn install` and then `yarn run build`. This will put everything needed into the `./extension` directory
and from there you can add the extension to your browser.

## Example Response

TODO: Write me a simulator

```json
{
  "leeches_available": 8,
  "leech_lesson_items": [{
    "name": "西",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["にし"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/西",
      "worst_incorrect": 3
    }
  }, {
    "name": "西",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["にし"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/西",
      "worst_incorrect": 3
    }
  }, {
    "name": "西",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["にし"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/西",
      "worst_incorrect": 3
    }
  }, {
    "name": "西",
    "type": "kanji",
    "train_type": "reading",
    "correct_answers": ["せい", "さい"],
    "try_again_answers": ["にし"],
    "leech": {
      "key": "vocabulary/西",
      "worst_incorrect": 3
    }
  }, {
    "name": "強",
    "type": "kanji",
    "train_type": "reading",
    "correct_answers": ["きょう"],
    "try_again_answers": ["つよ"],
    "leech": {
      "key": "kanji/強",
      "worst_incorrect": 2
    }
  }, {
    "name": "強",
    "type": "kanji",
    "train_type": "reading",
    "correct_answers": ["きょう"],
    "try_again_answers": ["つよ"],
    "leech": {
      "key": "kanji/強",
      "worst_incorrect": 2
    }
  }, {
    "name": "強",
    "type": "kanji",
    "train_type": "reading",
    "correct_answers": ["きょう"],
    "try_again_answers": ["つよ"],
    "leech": {
      "key": "kanji/強",
      "worst_incorrect": 2
    }
  }, {
    "name": "お母さん",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["おかあさん"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/お母さん",
      "worst_incorrect": 3
    }
  }, {
    "name": "お母さん",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["おかあさん"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/お母さん",
      "worst_incorrect": 3
    }
  }, {
    "name": "お母さん",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["おかあさん"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/お母さん",
      "worst_incorrect": 3
    }
  }, {
    "name": "母",
    "type": "kanji",
    "train_type": "reading",
    "correct_answers": ["はは"],
    "try_again_answers": ["ぼ"],
    "leech": {
      "key": "vocabulary/お母さん",
      "worst_incorrect": 3
    }
  }, {
    "name": "母",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["はは"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/お母さん",
      "worst_incorrect": 3
    }
  }, {
    "name": "お金",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["おかね"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/お金",
      "worst_incorrect": 3
    }
  }, {
    "name": "お金",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["おかね"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/お金",
      "worst_incorrect": 3
    }
  }, {
    "name": "お金",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["おかね"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/お金",
      "worst_incorrect": 3
    }
  }, {
    "name": "金",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["きん", "かね"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/お金",
      "worst_incorrect": 3
    }
  }, {
    "name": "全",
    "type": "kanji",
    "train_type": "reading",
    "correct_answers": ["ぜん"],
    "try_again_answers": ["すべ", "まった"],
    "leech": {
      "key": "vocabulary/お金",
      "worst_incorrect": 3
    }
  }, {
    "name": "全て",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["すべて"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/お金",
      "worst_incorrect": 3
    }
  }, {
    "name": "主人",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["しゅじん"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/主人",
      "worst_incorrect": 6
    }
  }, {
    "name": "主人",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["しゅじん"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/主人",
      "worst_incorrect": 6
    }
  }, {
    "name": "主人",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["しゅじん"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/主人",
      "worst_incorrect": 6
    }
  }, {
    "name": "社長",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["しゃちょう"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/社長",
      "worst_incorrect": 1
    }
  }, {
    "name": "社長",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["しゃちょう"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/社長",
      "worst_incorrect": 1
    }
  }, {
    "name": "社長",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["しゃちょう"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/社長",
      "worst_incorrect": 1
    }
  }, {
    "name": "今まで",
    "type": "vocabulary",
    "train_type": "meaning",
    "correct_answers": ["Until Now", "Up To Now", "So Far"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/今まで",
      "worst_incorrect": 5
    }
  }, {
    "name": "今まで",
    "type": "vocabulary",
    "train_type": "meaning",
    "correct_answers": ["Until Now", "Up To Now", "So Far"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/今まで",
      "worst_incorrect": 5
    }
  }, {
    "name": "今まで",
    "type": "vocabulary",
    "train_type": "meaning",
    "correct_answers": ["Until Now", "Up To Now", "So Far"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/今まで",
      "worst_incorrect": 5
    }
  }, {
    "name": "今",
    "type": "vocabulary",
    "train_type": "meaning",
    "correct_answers": ["Now"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/今まで",
      "worst_incorrect": 5
    }
  }, {
    "name": "今",
    "type": "kanji",
    "train_type": "meaning",
    "correct_answers": ["Now"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/今まで",
      "worst_incorrect": 5
    }
  }, {
    "name": "今すぐ",
    "type": "vocabulary",
    "train_type": "meaning",
    "correct_answers": ["At Once", "Right Now", "Immediately", "Right Away"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/今まで",
      "worst_incorrect": 5
    }
  }, {
    "name": "一月",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["いちがつ"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/一月",
      "worst_incorrect": 7
    }
  }, {
    "name": "一月",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["いちがつ"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/一月",
      "worst_incorrect": 7
    }
  }, {
    "name": "一月",
    "type": "vocabulary",
    "train_type": "reading",
    "correct_answers": ["いちがつ"],
    "try_again_answers": [],
    "leech": {
      "key": "vocabulary/一月",
      "worst_incorrect": 7
    }
  }]
}
```
