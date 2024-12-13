const { default: escapeStringRegexp } = require('escape-string-regexp');

const transformingModules = [
  'character-entities',
  'decode-named-character-reference',
  'micromark-core-commonmark',
  'micromark-factory-destination',
  'micromark-factory-label',
  'micromark-factory-space',
  'micromark-factory-title',
  'micromark-factory-whitespace',
  'micromark-util-character',
  'micromark-util-chunked',
  'micromark-util-classify-character',
  'micromark-util-combine-extensions',
  'micromark-util-decode-numeric-character-reference',
  'micromark-util-encode',
  'micromark-util-html-tag-name',
  'micromark-util-normalize-identifier',
  'micromark-util-resolve-all',
  'micromark-util-sanitize-uri',
  'micromark-util-subtokenize',
  'micromark'
];

module.exports = {
  testPathIgnorePatterns: ['/__setup__/', '/lib/', '/node_modules/', '/__types__/', '\\.pnp\\.[^\\/]+$'],
  transform: {
    '/__tests__/types/': ['<rootDir>/__tests__/__setup__/typingTestTransformer.js'],
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        presets: [
          [
            '@babel/preset-typescript',
            {
              allowDeclareFields: true
            }
          ],
          [
            '@babel/preset-env',
            {
              modules: 'commonjs',
              targets: {
                node: '20'
              }
            }
          ]
        ],
        sourceMaps: true
      }
    ]
  },
  transformIgnorePatterns: [
    `/node_modules/(?!(${transformingModules.map(escapeStringRegexp).join('|')})/)`,
    '\\.pnp\\.[^\\\/]+$'
  ],
  watchPathIgnorePatterns: ['\\.tmp\\.']
};
