var data = [];
var paren = 0;
var number = '';
var pCount = 0;
var dPoints=0;
var mCount=0;

function isWhat(val) {
  if (isNaN(Number(val)) === false || val === '.') {
    return 1;
  } else if (val === '+' || val === '-' || val === '*' || val === '/') {
    return 2;
  } else if (val === '(') {
    return 3;
  } else if (val === ')') {
    return 4;
  } else return 5;
}

function check(val) {
  var ind = data.length;
  var valType = isWhat(val);
  var pre = '';
  var preType = isWhat(data[ind - 1]);
  if(preType>0&&preType<5) pre = data[ind - 1];
  if(valType===1&&preType!==4){
    if(preType===1&&ind===1&&pre==='0'&&val!=='.'){
      mCount=0;
      data=[val];
    }
    else if(pre==='0'&&isWhat(data[ind-2])!==1&&val!=='.'){
      data.pop();
      data.push(val);
      mCount=0;
    }
    else if(val==='.'){
      dPoints++;
      if(dPoints<2) {
          if(preType!==1){
          data.push('0');
        }
        data.push(val);
        mCount=0;
      }
    }
    else {
      data.push(val);
      mCount=0;
    }
  }
  else if(valType===2){
    if(val==='-'&&pre!=='-'){
      mCount++;
      dPoints=0;
      if(mCount<3)data.push(val);
    }
    else if(ind===0){
      data.push('0');
      data.push(val);
      mCount=0;
      dPoints=0;
    }
    else if(preType!==2&&preType!==3){
      data.push(val);
      mCount=0;
      dPoints=0;
    }
  }
  else if(valType === 3) {
    if (preType !== 1 && preType !== 4) {
      pCount++;
      dPoints=0;
      data.push(val);
      mCount=0;
    }
  } else if (valType === 4) {
    if (pCount > 0 && preType !== 3 && preType !== 2) {
      pCount--;
      mCount=0;
      dPoints=0;
      data.push(val);
    }
  }
}

function clearAll() {
  data = [];
  number = '';
  pCount = 0;
  dPoints=0;
  mCount=0;
}

function equals() {
  var ans='';
  if (data.length === 0) {
    $("#ansScreen span").text("0");
    $("#eqnScreen span").text("0");
    $("#ext").css("visibility", "hidden");
    $("#extScreen span").text("0");
    return '0';
  }
  if (isWhat(data[data.length - 1]) === 2 || isWhat(data[data.length - 1]) === 3) {
    $("#ansScreen span").text("Invalid Syntax.");
    return;
  }
  if (pCount > 0) {
    while (pCount !== 0) {
      data.push(')');
      pCount--;
    }
  }
  var str=data.join('');
  var temp = eval(str);
  //$("#ansScreen span").text(temp);
  if (isWhat(temp) !== 1) $("#ansScreen span").text("undefined");
  var ans=temp+'';
  var pointAt=ans.indexOf('.');
  if(pointAt>15||(pointAt===-1&&ans.length>17)||ans.indexOf('e')!==-1){
    temp=temp.toExponential(8);
  }
  else if(pointAt!==-1&&ans.length>17){
    ans=ans.slice(0,17);
    temp=Number(ans);
  }
  if(pointAt!==-1)temp=(parseFloat(temp).toPrecision(15));
  var strtemp=temp+'';
  for(var i=strtemp.length-1;(strtemp[i]==='0'||strtemp[i]==='.')&&i>0&&strtemp.indexOf('.')!==-1;i--){
    strtemp=strtemp.slice(0,i);
  }
  $("#ansScreen span").text(strtemp);
  return strtemp;
}

function show(arr) {
  var temp = arr.join('');
  if (temp.length < 26) {
    $("#eqnScreen span").text('' + temp);
    $("#extScreen span").css("visibility", "hidden");
  } else if (temp.length > 25 && temp.length < 50) {
    $("#eqnScreen span").text('' + temp.slice(temp.length-25, temp.length));
    $("#ext").css("visibility", "visible");
    $("#extScreen span").text('' + temp.slice(0,temp.length-25));
  } else {
    $("#eqnScreen span").text('' + temp.slice(temp.length-25,temp.length));
    $("#ext").css("visibility", "visible");
    $("#extScreen span").text('..' + temp.slice(temp.length-49, temp.length-25));
  }
}

function clearRes() {
  if(isWhat(ans)===1){
    var temp=ans+'';
    temp=temp.split('');
    clearAll();
    for(var i=0;i<temp.length;i++){
      check(temp[i]);
    }
  }
}

function backSpc() {
  if(data.length){
    var x=data.pop();
    if(x==='.'){
      dPoints=0;
    }
    else if(x==='-'){
      mCount--;
    }
    else if(data[data.length-1]==='-'){
      mCount++;
      if(data[data.length-2]==='-'){
        mCount++;
      }
    }
    else if(x==='('){
      pCount--;
    }
    else if(x===')'){
      pCount++;
    }
  }
}

$(document).on("keydown", function(e) {
  if (e.which === 8 && !$(e.target).is("input, textarea")) {
    e.preventDefault();
  }
});

$(document).ready(function() {
  $("#one").on("click", function() {
    check('1');
    show(data);
  });
  $("#two").on("click", function() {
    check('2');
    show(data);
  });
  $("#three").on("click", function() {
    check('3');
    show(data);
  });
  $("#four").on("click", function() {
    check('4');
    show(data);
  });
  $("#five").on("click", function() {
    check('5');
    show(data);
  });
  $("#six").on("click", function() {
    check('6');
    show(data);
  });
  $("#seven").on("click", function() {
    check('7');
    show(data);
  });
  $("#eight").on("click", function() {
    check('8');
    show(data);
  });
  $("#nine").on("click", function() {
    check('9');
    show(data);
  });
  $("#zero").on("click", function() {
    check('0');
    show(data);
  });
  $("#point").on("click", function() {
    check('.');
    show(data);
  });
  $("#opb").on("click", function() {
    check('(');
    show(data);
  });
  $("#clb").on("click", function() {
    check(')');
    show(data);
  });
  $("#multiply").on("click", function() {
    check('*');
    show(data);
  });
  $("#by").on("click", function() {
    check('/');
    show(data);
  });
  $("#plus").on("click", function() {
    check('+');
    show(data);
  });
  $("#minus").on("click", function() {
    check('-');
    show(data);
  });
  $("#equals").on("click", function() {
    ans=equals();
    clearRes();
    show(data);
  });
  $("#reset").on("click", function() {
    clearAll();
    show(data);
    equals();
  });
  $("#del").on("click", function() {
    backSpc();
    show(data);
  });

  //support for keyboard
  $(window).keydown(function(e) {
    var key = e.which;
    if (e.shiftKey) {
      switch (key) {
        case 56:
          check('*');
          show(data);
          break;
        case 57:
          check('(');
          show(data);
          break;
        case 48:
          check(')');
          show(data);
          break;
        case 61:
          check('+');
          show(data);
          break;
      }
    } else {
      switch (key) {
        case 48:
        case 96:
          check('0');
          show(data);
          break;
        case 97:
        case 49:
          check('1');
          show(data);
          break;
        case 98:
        case 50:
          check('2');
          show(data);
          break;
        case 99:
        case 51:
          check('3');
          show(data);
          break;
        case 100:
        case 52:
          check('4');
          show(data);
          break;
        case 101:
        case 53:
          check('5');
          show(data);
          break;
        case 102:
        case 54:
          check('6');
          show(data);
          break;
        case 103:
        case 55:
          check('7');
          show(data);
          break;
        case 104:
        case 56:
          check('8');
          show(data);
          break;
        case 57:
        case 105:
          check('9');
          show(data);
          break;
        case 8:
          backSpc();
          show(data);
          break;
        case 106:
        case 42:
          check('*');
          show(data);
          break;
        case 110:
        case 190:
          check('.');
          show(data);
          break;
        case 191:
        case 111:
          check('/');
          show(data);
          break;
        case 46:
          clearAll();
          ans=equals();
          show(data);
          break;
        case 107:
          check('+');
          show(data);
          break;
        case 189:
        case 109:
          check('-');
          show(data);
          break;
        case 13:
        case 187:
        case 61:
          ans=equals();
          clearRes();
          show(data);
          break;
      }
    }
  });
});
