<?
$App = function($props) {
  return $React->createElement('div', [
            'style' => [
              'width' => '100%',
              'textAlign' => 'center',
              'background' => '#8892BF',
              'padding' => '2rem 0'
              ]
            ],
          [$React->createElement('img', [
            'key' => 'image!',  
            'src' => $props->src,          
            'style' => [
              'width' => 'auto',              
              'height' => '100px',
            ],
          ]),
          $React->createElement('h1', [
            'key' => 'text',            
            'style' => [
              'width' => '100%',
              'height' => '100%',
            ],
          ], 'This is some more React code!'),
          $React->createElement('div', [
            'key' => 'subtitle',          
            'onClick' => function () {
                console.log('fuck');
            },
            'style' => [
              'width' => '100%',
              'height' => '100%',
              'fontSize' => '1.25rem',
              'fontWeight' => 'bold',
            ],
          ], 'Written with PHP and transpiled with babel-preset-php!')]
         );
};

$module->exports = $App;