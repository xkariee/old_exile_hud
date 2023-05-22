//dont change
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? new ImGui.ImVec4(parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255, 1.0) : new ImGui.ImVec4(0.0, 0.0, 0.0, 1.0);
}
(async function() {
  let toggled = false;
  let hidden = false;
  let canchange = true;
  
  var settingss = window.localStorage.getItem('settings');
  var settings = settingss
    ? JSON.parse(settingss)
    : {
        hp: rgbToHex(209, 0, 31),
        armor: rgbToHex(10, 89, 199),
        hunger: rgbToHex(130, 83, 39),
        thirst: rgbToHex(32, 128, 201),
        oxygen: rgbToHex(115, 143, 235),
        sound: rgbToHex(196, 190, 190),
        align: '2',
        align1: '1'
      };
  var animations = {
    one: { bottom: '18px' },
    two: { bottom: '-80px' },
    three: { bottom: '0px' },
  };
  
  function resetSettings() {
    settings = {
      hp: rgbToHex(209, 0, 31),
      armor: rgbToHex(10, 89, 199),
      hunger: rgbToHex(130, 83, 39),
      thirst: rgbToHex(32, 128, 201),
      oxygen: rgbToHex(115, 143, 235),
      sound: rgbToHex(196, 190, 190),
      align: '2',
      align1: '1'
    };
    color = hexToRgb(settings.hp) 
    color1 = hexToRgb(settings.armor) 
    color2 = hexToRgb(settings.hunger) 
    color3 = hexToRgb(settings.thirst) 
    color4 = hexToRgb(settings.oxygen) 
    color5 = hexToRgb(settings.sound) 
    align_hud = settings.align-1
    align_taskbar = settings.align1-1
    setAlign(settings.align);
    window.localStorage.setItem('settings', JSON.stringify(settings));

    setTimeout(() => {
      toggled = true;
      $('.hud-collapse').animate(animations.two, 300);
      setTimeout(function () {
        if (toggled) {
          $('.hud').animate(animations.one, 300);
        }
      }, 500);
    }, 500);
  }
  
  function setAlign(t) {
    if (t == '2') {
      $('#thirst').css('transform', '');
      $('#hunger').css('transform', '');
      $('#sound').css('transform', '');
      $('.hud').css('right', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-left-radius', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
      $('.hud').css('right', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
      $('.hud-collapse').css('border-bottom-right-radius', '');
      $('.hud').css('left', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('left', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-left-radius', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
  
      $('ul').css('display', '');
      $('li').css('display', '');
      $('ul').css('display', 'flex');
      $('li').css('display', 'flex');
  
      $('.hud').css('bottom', '');
      $('.hud').css('right', '');
      $('.hud').css('transform', '');
      $('.hud').css('bottom', '-80px');
      $('.hud').css('right', '50%');
      $('.hud').css('transform', 'translateX(50%)');
  
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('bottom', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-left-radius', '');
      $('.hud-collapse').css('border-top-right-radius', '');
      $('.hud-collapse').css('width', '125px');
      $('.hud-collapse').css('height', '20px');
      $('.hud-collapse').css('bottom', '0');
      $('.hud-collapse').css('right', '50%');
      $('.hud-collapse').css('transform', 'translateX(50%)');
      $('.hud-collapse').css('border-top-left-radius', '5px');
      $('.hud-collapse').css('border-top-right-radius', '5px');
  
      $('.hud-collapse').html(
        '<span class="material-icons">arrow_drop_up</span>'
      );
      animations = {
        one: { bottom: '18px' },
        two: { bottom: '-80px' },
        three: { bottom: '0px' },
      };
    } else if (t == '4') {
      $('.hud').css('bottom', '');
      $('.hud').css('right', '');
      $('.hud').css('transform', '');
      $('.hud').css('bottom', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('bottom', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-left-radius', '');
      $('.hud-collapse').css('border-top-right-radius', '');
      $('.hud').css('right', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
      $('.hud-collapse').css('border-bottom-right-radius', '');
      $('.hud').css('left', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('left', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-left-radius', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
  
      $('ul').css('display', '');
      $('li').css('display', '');
      $('ul').css('display', 'block');
      $('li').css('display', 'block');
  
      $('.hud').css('right', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud').css('right', '-80px');
      $('.hud').css('top', '50%');
      $('.hud').css('transform', 'translateY(-50%)');
  
      $('#thirst').css('transform', '');
      $('#hunger').css('transform', '');
      $('#sound').css('transform', '');
      $('#thirst').css('transform', 'translateX(3px)');
      $('#hunger').css('transform', 'translateX(1px)');
      $('#sound').css('transform', 'translateX(3px)');
  
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-left-radius', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
      $('.hud-collapse').css('height', '125px');
      $('.hud-collapse').css('width', '20px');
      $('.hud-collapse').css('right', '0');
      $('.hud-collapse').css('top', '50%');
      $('.hud-collapse').css('transform', 'translateY(-50%)');
      $('.hud-collapse').css('border-top-left-radius', '5px');
      $('.hud-collapse').css('border-bottom-left-radius', '5px');
  
      $('.hud-collapse').html('<span class="material-icons">arrow_left</span>');
      animations = {
        one: { right: '18px' },
        two: { right: '-80px' },
        three: { right: '0px' },
      };
    } else if (t == '1') {
      $('.hud').css('bottom', '');
      $('.hud').css('right', '');
      $('.hud').css('transform', '');
      $('.hud').css('bottom', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('bottom', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-left-radius', '');
      $('.hud-collapse').css('border-top-right-radius', '');
      $('.hud').css('right', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
      $('.hud-collapse').css('border-bottom-right-radius', '');
      $('.hud').css('left', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('left', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-left-radius', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
  
      $('ul').css('display', '');
      $('li').css('display', '');
      $('ul').css('display', 'flex');
      $('li').css('display', 'flex');
  
      $('.hud').css('right', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud').css('top', '-80px');
      $('.hud').css('right', '50%');
      $('.hud').css('transform', 'translateX(50%)');
  
      $('#thirst').css('transform', '');
      $('#hunger').css('transform', '');
      $('#sound').css('transform', '');
  
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
      $('.hud-collapse').css('border-bottom-right-radius', '');
      $('.hud-collapse').css('height', '20px');
      $('.hud-collapse').css('width', '125px');
      $('.hud-collapse').css('top', '0');
      $('.hud-collapse').css('right', '50%');
      $('.hud-collapse').css('transform', 'translateX(50%)');
      $('.hud-collapse').css('border-bottom-left-radius', '5px');
      $('.hud-collapse').css('border-bottom-right-radius', '5px');
  
      $('.hud-collapse').html(
        '<span class="material-icons">arrow_drop_down</span>'
      );
      animations = {
        one: { top: '18px' },
        two: { top: '-80px' },
        three: { top: '0px' },
      };
    } else if (t == '3') {
      $('.hud').css('bottom', '');
      $('.hud').css('right', '');
      $('.hud').css('transform', '');
      $('.hud').css('bottom', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('bottom', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-left-radius', '');
      $('.hud-collapse').css('border-top-right-radius', '');
      $('.hud').css('right', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('right', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-bottom-left-radius', '');
      $('.hud-collapse').css('border-bottom-right-radius', '');
  
      $('ul').css('display', '');
      $('li').css('display', '');
      $('ul').css('display', 'block');
      $('li').css('display', 'block');
  
      $('.hud').css('left', '');
      $('.hud').css('top', '');
      $('.hud').css('transform', '');
      $('.hud').css('left', '-80px');
      $('.hud').css('top', '50%');
      $('.hud').css('transform', 'translateY(-50%)');
  
      $('#thirst').css('transform', '');
      $('#hunger').css('transform', '');
      $('#sound').css('transform', '');
      $('#thirst').css('transform', 'translateX(3px)');
      $('#hunger').css('transform', 'translateX(1px)');
      $('#sound').css('transform', 'translateX(3px)');
  
      $('.hud-collapse').css('height', '');
      $('.hud-collapse').css('width', '');
      $('.hud-collapse').css('left', '');
      $('.hud-collapse').css('top', '');
      $('.hud-collapse').css('transform', '');
      $('.hud-collapse').css('border-top-right-radius', '');
      $('.hud-collapse').css('border-bottom-right-radius', '');
      $('.hud-collapse').css('height', '125px');
      $('.hud-collapse').css('width', '20px');
      $('.hud-collapse').css('left', '0');
      $('.hud-collapse').css('top', '50%');
      $('.hud-collapse').css('transform', 'translateY(-50%)');
      $('.hud-collapse').css('border-top-right-radius', '5px');
      $('.hud-collapse').css('border-bottom-right-radius', '5px');
  
      $('.hud-collapse').html('<span class="material-icons">arrow_right</span>');
      animations = {
        one: { left: '18px' },
        two: { left: '-80px' },
        three: { left: '0px' },
      };
    }
  }
  
  setTimeout(() => {
    window.localStorage.setItem('settings', JSON.stringify(settings));
    $.post('https://qHud/progressalign', JSON.stringify({align: settings.align1}));
    setAlign(settings.align);
    align_hud = settings.align-1
    align_taskbar = settings.align1-1
  }, 1000);

  function exit() {
    disableMenu()
    disableMenu()
    $('.containerx').fadeOut(300);
    $.post('https://qHud/NUIFocusOff', JSON.stringify({}));
  }
  
  $(document).on('keyup', function (e) {
    if (e.key == 'Escape') {
      exit();
    }
  });
  
  function saveSettings() {
    $.post('https://qHud/progressalign', JSON.stringify({align: settings.align1}));
    setAlign(settings.align);
    window.localStorage.setItem('settings', JSON.stringify(settings));

    setTimeout(() => {
      toggled = true;
      $('.hud-collapse').animate(animations.two, 300);
      setTimeout(function () {
        if (toggled) {
          $('.hud').animate(animations.one, 300);
        }
      }, 500);
    }, 500);
  }
  
  var switchh = true;
  
  window.addEventListener('message', (event) => {
    if (event.data.type == 'SET_SETTINGS') {
      if (event.data.hidden) {
        if (event.data.hidden == 'true') {
          hidden = true;
          $('.hud').hide();
          $('.hud-collapse').hide();
        } else {
          $('.hud').show();
          $('.hud-collapse').show();
          hidden = false;
        }
      }
    }
    if (event.data.type == 'OPEN_SETTINGS') {
      enableMenu()
    }
    if (event.data.type == 'CLOSE_SETTINGS') {
      disableMenu()
      
    }
    if (event.data.type == 'TOGGLE_HUD') {
      if (toggled) {
        toggled = false;
        $('.hud').animate(animations.two, 300);
        setTimeout(function () {
          if (!toggled) {
            $('.hud-collapse').animate(animations.three, 300);
          }
        }, 500);
      } else {
        toggled = true;
        $('.hud-collapse').animate(animations.two, 300);
        setTimeout(function () {
          if (toggled) {
            $('.hud').animate(animations.one, 300);
          }
        }, 500);
      }
      return;
    }

    if(event.data.type == "ENABLE_TRAILER") {
      disableMenu()
      startTrailer()
    }
  
    if (event.data.type == 'UPDATE_VOICE') {
      if (event.data.isTalking) {
        if (event.data.mode == 'Car') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:rgb(79, 75, 75);stop-opacity:1" /><stop offset="25%" style="stop-color:rgb(54, 50, 50);stop-opacity:1"/><stop offset="25%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Whisper') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:rgb(79, 75, 75);stop-opacity:1" /><stop offset="50%" style="stop-color:rgb(54, 50, 50);stop-opacity:1"/><stop offset="50%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Normal') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:rgb(79, 75, 75);stop-opacity:1" /><stop offset="75%" style="stop-color:rgb(54, 50, 50);stop-opacity:1"/><stop offset="75%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Shouting') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:rgb(79, 75, 75);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(54, 50, 50);stop-opacity:1"/><stop offset="100%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        }
      } else {
        if (event.data.mode == 'Car') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1" /><stop offset="25%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1"/><stop offset="25%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Whisper') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1" /><stop offset="50%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1"/><stop offset="50%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Normal') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1" /><stop offset="75%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1"/><stop offset="75%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Shouting') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1" /><stop offset="100%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1"/><stop offset="100%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        }
      }
      return;
    }
    if (event.data.type == 'SWITCH_DISPLAY') {
      if (switchh && canchange) {
        $('html').fadeOut(500);
        switchh = false;
      } else {
        if (canchange) {
          $('html').fadeIn(500);
          switchh = true;
        }
      }
    }
    if (event.data.type == 'SWITCH_HUD') {
      if (event.data.mode) {
        $('html').fadeOut(500);
        window.localStorage.setItem('hud', 'old');
      } else {
        $('html').fadeIn(500);
        window.localStorage.setItem('hud', 'new');
      }
    }
    if (event.data.type == 'SWITCH_VISIBILITY') {
      if (event.data.bool) {
        window.localStorage.setItem('hud', 'new');
      } else {
        window.localStorage.setItem('hud', 'old');
      }
      if (event.data.bool) {
        $('html').fadeIn(500);
        canchange = true;
      } else {
        $('html').fadeOut(500);
        canchange = false;
      }
    }
    if (event.data.type == 'UPDATE_HUD') {
      if (event.data.hunger) {
        var hungerlevel = Math.floor(event.data.hunger);
        $('#grad3').html(
          '<stop offset="0%" style="stop-color:' +
            settings.hunger +
            ';stop-opacity:1" /><stop offset="' +
            hungerlevel +
            '%" style="stop-color:' +
            settings.hunger +
            ';stop-opacity:1" /><stop offset="' +
            hungerlevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.thirst) {
        var thirstlevel = Math.floor(event.data.thirst);
        $('#grad4').html(
          '<stop offset="0%" style="stop-color:' +
            settings.thirst +
            ';stop-opacity:1" /><stop offset="' +
            thirstlevel +
            '%" style="stop-color:' +
            settings.thirst +
            ';stop-opacity:1" /><stop offset="' +
            thirstlevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.armor) {
        var armorlevel = Math.floor(event.data.armor);
        $('#grad2').html(
          '<stop offset="0%" style="stop-color:' +
            settings.armor +
            ';stop-opacity:1" /><stop offset="' +
            armorlevel +
            '%" style="stop-color:' +
            settings.armor +
            ';stop-opacity:1" /><stop offset="' +
            armorlevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.armor <= 0) {
        $('#armor').fadeOut(1000);
      }
      if (event.data.armor > 0) {
        $('#armor').fadeIn(1000);
      }
      if (event.data.nurkowanie) {
        var oxygenlevel = Math.floor(event.data.nurkowanie);
        $('#grad5').html(
          '<stop offset="0%" style="stop-color:' +
            settings.oxygen +
            ';stop-opacity:1" /><stop offset="' +
            oxygenlevel +
            '%" style="stop-color:' +
            settings.oxygen +
            ';stop-opacity:1" /><stop offset="' +
            oxygenlevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.inwater) {
        $('#oxygen').fadeIn(1000);
      }
      if (!event.data.inwater) {
        $('#oxygen').fadeOut(1000);
      }
      if (event.data.stress <= 1) {
        $('#stress').fadeOut(1000);
      }
      if (event.data.stress > 1) {
        $('#stress').fadeIn(1000);
      }
      // if (event.data.stress) {
      // 	var stress = Math.floor(event.data.stress / 10)
      // 	$('#grad6').html('<stop offset="' + stress + '%" style="stop-color:rgb(142, 84, 233);stop-opacity:1" /><stop offset="' + stress + '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>')
      // }
      if (event.data.zycie) {
        var hplevel = Math.floor(event.data.zycie);
        $('#grad1').html(
          '<stop offset="0%" style="stop-color:' +
            settings.hp +
            ';stop-opacity:1" /><stop offset="' +
            hplevel +
            '%" style="stop-color:' +
            settings.hp +
            ';stop-opacity:1" /><stop offset="' +
            hplevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.isdead) {
        $('#grad1').html(
          '<stop offset="0%" style="stop-color:' +
            settings.hp +
            ';stop-opacity:1" /><stop offset="0%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      return;
    }
  });
  
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  window.addEventListener('load', (event) => {
    $('#help').fadeOut(0);
  });


  await ImGui.default();

  const canvas = document.getElementById("output");
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvas.scrollWidth * devicePixelRatio;
  canvas.height = canvas.scrollHeight * devicePixelRatio;
  const context = canvas.getContext('2d');
  window.addEventListener("resize", () => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.scrollWidth * devicePixelRatio;
    canvas.height = canvas.scrollHeight * devicePixelRatio;
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
  ImGui.CreateContext();
  ImGui_Impl.Init(canvas);

  ImGui.StyleColorsDark();
  window.requestAnimationFrame(_loop);
  //ImGui.StyleColorsClassic();

  let done = false;
  var align_hud = 0
  var align_taskbar = 0
  var aligns = [
    "Gora",
    "Dol",
    "Lewo",
    "Prawo"
  ]
  /*
      hp: rgbToHex(209, 0, 31),
      armor: rgbToHex(10, 89, 199),
      hunger: rgbToHex(252, 186, 3),
      thirst: rgbToHex(102, 79, 14),
      oxygen: rgbToHex(115, 143, 235),
      sound: rgbToHex(196, 190, 190),
  */
  var color = hexToRgb(settings.hp) 
  var color1 = hexToRgb(settings.armor) 
  var color2 = hexToRgb(settings.hunger) 
  var color3 = hexToRgb(settings.thirst) 
  var color4 = hexToRgb(settings.oxygen) 
  var color5 = hexToRgb(settings.sound) 

  var enabled = true;  

  function _loop(time) {
      enabled = true
    context.clearRect(0, 0, canvas.width, canvas.height);
    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();

    ImGui.SetNextWindowPos(new ImGui.ImVec2(20, 20), ImGui.Cond.FirstUseEver);
    ImGui.SetNextWindowSize(new ImGui.ImVec2(294, 140), ImGui.Cond.FirstUseEver);
    ImGui.Begin("Ustawienia HUDu");
    ImGui.Separator()
    ImGui.TextColored(new ImGui.ImVec4(0.1,0.1,0.1,1.0), "Pozycja");
    if(ImGui.BeginCombo("Pozycja HUDu", aligns[align_hud])) {
      aligns.forEach((align) => {
        const is_selected = (align == aligns[align_hud])
        if(ImGui.Selectable(align, is_selected)) {
          align_hud = aligns.indexOf(align)
          settings.align = aligns.indexOf(align)+1
        }
        if(is_selected) {
          ImGui.SetItemDefaultFocus()
        }
      })
    }
    ImGui.Separator()
    ImGui.Text("Kolor")

    if(ImGui.ColorEdit4("HP", color)) {
      let hex = rgbToHex(Math.floor(color.x*255), Math.floor(color.y*255), Math.floor(color.z*255))
      $('#grad1').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.hp = hex
    }
    if(ImGui.ColorEdit4("Armor", color1)) {
      let hex = rgbToHex(Math.floor(color1.x*255), Math.floor(color1.y*255), Math.floor(color1.z*255))
      $('#grad2').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.armor = hex
    }
    if(ImGui.ColorEdit4("Glod", color2)) {
      let hex = rgbToHex(Math.floor(color2.x*255), Math.floor(color2.y*255), Math.floor(color2.z*255))
      $('#grad3').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.hunger = hex
    }
    if(ImGui.ColorEdit4("Napojenie", color3)) {
      let hex = rgbToHex(Math.floor(color3.x*255), Math.floor(color3.y*255), Math.floor(color3.z*255))
      $('#grad4').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.thirst = hex
    }
    if(ImGui.ColorEdit4("Tlen", color4)) {
      let hex = rgbToHex(Math.floor(color4.x*255), Math.floor(color4.y*255), Math.floor(color4.z*255))
      $('#grad5').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.oxygen = hex
    }
    if(ImGui.ColorEdit4("Voice", color5)) {
      let hex = rgbToHex(Math.floor(color5.x*255), Math.floor(color5.y*255), Math.floor(color5.z*255))
      $('#grad7').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.sound = hex
    }
    ImGui.Separator()
    if(ImGui.Button("Zapisz")) {
      saveSettings()
    }
    ImGui.SameLine()
    if(ImGui.Button("Resetuj")) {
      resetSettings()
    }
    ImGui.Separator()
    ImGui.Text("ExileRP © 2022")

    ImGui.End();

    ImGui.EndFrame();

    ImGui.Render();
    const gl = ImGui_Impl.gl;
    gl && gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl && gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound

    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());

    window.requestAnimationFrame(done ? _done : _loop);
  }

  /*

        Trailer

  */

  async function startTrailer() {
    await ImGui.default()
    ImGui.CreateContext();
    ImGui_Impl.Init(canvas);
  
    ImGui.StyleColorsDark();
    window.requestAnimationFrame(_loop1);
    setTimeout(() => {
      hudpos = true
      setTimeout(() => {
        taskbarpos = true
        setTimeout(() => {
          hps = true
          setTimeout(() => {
            armorh = true
            setTimeout(() => {
              hungerh = true
              setTimeout(() => {
                thirsth = true
                setTimeout(() => {
                  oxygenh = true
                  setTimeout(() => {
                    soundh = true
                  },550)
                },550)
              },550)
            }, 550)
          }, 550)
        }, 400)
      },400)
    }, 400)
  }

  var hudpos,taskbarpos,hps,armorh,hungerh,oxygenh,thirsth,soundh

  function _loop1(time) {
      enabled = true
    context.clearRect(0, 0, canvas.width, canvas.height);
    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();

    ImGui.SetNextWindowPos(new ImGui.ImVec2(20, 20), ImGui.Cond.FirstUseEver);
    ImGui.SetNextWindowSize(new ImGui.ImVec2(294, 140), ImGui.Cond.FirstUseEver);
    ImGui.Begin("Ustawienia HUDu");
    ImGui.Separator()
    ImGui.TextColored(new ImGui.ImVec4(0.1,0.1,0.1,1.0), "Pozycja");
    if(hudpos && ImGui.BeginCombo("Pozycja HUDu", aligns[align_hud])) {
      aligns.forEach((align) => {
        const is_selected = (align == aligns[align_hud])
        if(ImGui.Selectable(align, is_selected)) {
          align_hud = aligns.indexOf(align)
          settings.align = aligns.indexOf(align)+1
        }
        if(is_selected) {
          ImGui.SetItemDefaultFocus()
        }
      })
    }
    if(taskbarpos && ImGui.BeginCombo("Pozycja Taskbara", aligns[align_taskbar])) {
      aligns.forEach((align) => {
        const is_selected = (align == aligns[align_taskbar])
        if(ImGui.Selectable(align, is_selected)) {
          align_taskbar = aligns.indexOf(align)
          settings.align1 = aligns.indexOf(align)+1
        }
        if(is_selected) {
          ImGui.SetItemDefaultFocus()
        }
      })
    }
    ImGui.Separator()
    ImGui.Text("Kolor")

    if(hps && ImGui.ColorEdit4("HP", color)) {
      let hex = rgbToHex(Math.floor(color.x*255), Math.floor(color.y*255), Math.floor(color.z*255))
      $('#grad1').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.hp = hex
    }
    if(armorh && ImGui.ColorEdit4("Armor", color1)) {
      let hex = rgbToHex(Math.floor(color1.x*255), Math.floor(color1.y*255), Math.floor(color1.z*255))
      $('#grad2').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.armor = hex
    }
    if(hungerh && ImGui.ColorEdit4("Glod", color2)) {
      let hex = rgbToHex(Math.floor(color2.x*255), Math.floor(color2.y*255), Math.floor(color2.z*255))
      $('#grad3').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.hunger = hex
    }
    if(thirsth && ImGui.ColorEdit4("Napojenie", color3)) {
      let hex = rgbToHex(Math.floor(color3.x*255), Math.floor(color3.y*255), Math.floor(color3.z*255))
      $('#grad4').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.thirst = hex
    }
    if(oxygenh && ImGui.ColorEdit4("Tlen", color4)) {
      let hex = rgbToHex(Math.floor(color4.x*255), Math.floor(color4.y*255), Math.floor(color4.z*255))
      $('#grad5').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.oxygen = hex
    }
    if(soundh && ImGui.ColorEdit4("Voice", color5)) {
      let hex = rgbToHex(Math.floor(color5.x*255), Math.floor(color5.y*255), Math.floor(color5.z*255))
      $('#grad7').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.sound = hex
    }
    ImGui.Separator()
    if(ImGui.Button("Zapisz")) {
      saveSettings()
    }
    ImGui.SameLine()
    if(ImGui.Button("Resetuj")) {
      resetSettings()
    }
    ImGui.Separator()
    ImGui.Text("by exilerp for ExileRP © 2022")

    ImGui.End();

    ImGui.EndFrame();

    ImGui.Render();
    const gl = ImGui_Impl.gl;
    gl && gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl && gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound

    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());

    window.requestAnimationFrame(done ? _done : _loop1);
  }



  /*

    Trailer end

  */

  function _done() {
    ImGui_Impl.Shutdown();
    ImGui.DestroyContext();
  }

  async function disableMenu() {
    if(enabled) {
        enabled = false
        _done()
    }
  }
  setTimeout(() => {
    disableMenu()
  },500)

  async function enableMenu() {
    await ImGui.default()
    ImGui.CreateContext();
    ImGui_Impl.Init(canvas);
  
    ImGui.StyleColorsDark();
    window.requestAnimationFrame(_loop);
  }
  
})();