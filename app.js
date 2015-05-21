
_FONTS.forEach(function(fontObj) {
  $('head').append($(
      [
        '<link rel="stylesheet" type="text/css" href="',
          fontObj['url'],
        '">'
      ].join('')));
});

$(document).ready(function() {
  var fontList = $('#font-list');
  _FONTS.forEach(function(fontObj) {
    var radioBtnId = 'font:' + fontObj['id'];
    fontList.append($(
        [
          '<div class="radio-inline"><label><input type="radio" name="optfont" id="', radioBtnId, '" value="', fontObj['name'], '">',
            '<span style="text-align: center; font-family: \'', fontObj['name'], '\', ', fontObj['alt'], '">',
              fontObj['name'],
            '</span>',
          '</label></div>'
        ].join('')));
  });

  $(window).resize(Draw);
  setTimeout(Draw, 500);
});

function Inspire() {
  $('#input-text').val(Inspiration.give());
  Draw();
}

function Draw() {
  var fontName = $('input:radio[name=optfont]:checked').val();
  var text = $('#input-text').val();
  if (!fontName) {
    fontName = _FONTS[0]['name'];
    $('#font:' + _FONTS[0]['id']).prop('checked', true);
  }
  var fontObj;
  _FONTS.forEach(function(f) {
    if (f['name'] === fontName) {
      fontObj = f;
    }
  });
  var colorValue = $('#font-color').val();
  if (!colorValue) {
    colorValue = '#000000';
  }

  // Clean.
  var lines = text.split(/\n/).map(function(line) {
    return line.replace(/^\s+|\s+$/g, '');
  });
  lines = lines.filter(function(line) {
    return line && line.length;
  });

  // Draw.
  LoudLetters({
    'lines': lines,
    'elems': $('.loud-letters'),
    'fontObj': fontObj,
    'color': colorValue
  });
}

function TextBlock(text, fontObj, fontSize, lh, fontColor, optClass) {
  var fontName = fontObj['name'];
  var lhPenalty = fontObj['lhPenalty'] || 1.0;
  lh = Math.floor(lh * Math.pow(lhPenalty, (lhPenalty >= 1 ? 0.5 : 2)));
  text = text.replace(/\s/g, '&nbsp;');
  return [
    '<span ',
      optClass ? 'class="' + optClass + '" ' : '',
      'style="color: ' + fontColor + '; ',
             'whitespace: preserve; ',
             'line-height: ' + lh + 'px; ',
             'font-family: \'' + fontName + '\'; ',
             'font-size: ', fontSize, 'px">',
      text,
    '</span>'
  ].join('');
}

function TextDim(text, fontObj, fontSize) {
  var d = $(TextBlock(text, fontObj, fontSize, 'normal', '#000', 'transients')).hide();
  $('body').append(d);
  var w = d.width();
  var h = d.height();
  $('body').remove('.transients');
  return [w, h];
}

function LoudLetters(params) {
  var fontObj = params['fontObj'];
  var fontName = fontObj['fontName'];
  var textColor = params['color'];

  params.elems.each(function() {
    $(this).empty();
    var maxWidth = $(this).width();
    var lines = params['lines'];
    var html = [];

    // Find the font size that maximizes the bounded width of
    // each line of rendered text so that it fits exactly on its line.
    lines.forEach(function(line) {
      var fontSizeMin = 0;    // reasonable minimum font size (px)
      var fontSizeMax = 1024; // reasonable (?) maximum font size (px)
      var lineHeight;         // output line height for selected font size
      var lineWidth;          // output line width for selected font size
      while (fontSizeMax - fontSizeMin > 1) {
        var mid = Math.floor((fontSizeMax + fontSizeMin) / 2);
        var textDims = TextDim(line, fontObj, mid);
        lineWidth = textDims[0];   // rendered width
        lineHeight = textDims[1];  // rendered height
        if (lineWidth > maxWidth) {
          fontSizeMax = mid;
        } else {
          fontSizeMin = mid;
        }
      }
      html.push(TextBlock(line, fontObj, fontSizeMin, lineHeight, textColor));
    });
    var htmlOut = html.join('\n');
    var linkRel = '<link rel="stylesheet" type="text/css" href="' + fontObj['url'] + '">';
    $('#html_out').text(linkRel + '\n' + htmlOut)
    $(this).replaceWith($('<div class="loud-letters">' + htmlOut + '</div>'));
  });
}
