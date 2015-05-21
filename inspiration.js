var Inspiration = {
  'words': {
    'desc_adj': [
      'tickled',
      'verage',
      'big',
      'colossal',
      'fat',
      'giant',
      'gigantic',
      'great',
      'huge',
      'immense',
      'large',
      'little',
      'long',
      'mammoth',
      'massive',
      'miniature',
      'petite',
      'puny',
      'short',
      'small',
      'tall',
      'tiny',
      'boiling',
      'breezy',
      'lazy',
      'galloping'
    ],
    'plu_noun': [
      'feet',
      'cats',
      'dogs',
      'cars',
      'planes',
      'trees',
      'oceans',
      'mountains',
      'thunderbolts',
      'wars',
      'wards',
      'children',
      'carrots',
      'seeds',
      'balls of fire'
    ],
    'action': [
      'start',
      'end',
      'bow to',
      'steal from',
      'lend to',
      'beget',
      'surprise',
      'praise',
      'celebrate',
      'admit',
      'release',
      'touch',
      'pass over',
      'pass under',
      'pass through',
      'turn into',
      'will one day be',
      'give way to',
      'yield'
    ],
    'quantity': [
      'no',
      'some',
      'all',
      'few',
      'many',
      'hundreds of',
      'a multitude of',
      'a gaggle of',
      'a flock of',
      'thousands of barrels worth of',
      'a flagon\'s worth of'
    ]
  },
  'give': function() {
    function pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    var words = Inspiration['words'];
    var sents = [
      function() {
        return [
          capitalize(pick(words['desc_adj'])),
          pick(words['plu_noun']),
          '\n',
          pick(words['action']),
          '\n',
          pick(words['quantity']),
          pick(words['plu_noun'])
        ].join(' ');
      }
    ];
    return pick(sents)();
  }
};
