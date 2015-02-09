//converts string numbers to floats//
var parse = function(string) {
  var arr = string.replace(/\s+/g,"").split("");

  for (var i = 0; i < arr.length; i++) {
    if (parseFloat(arr[i])) {
      arr[i] = parseFloat(arr[i])
    }
  }
  return arr;
}


//performs individual calculations in the array based on the index that's passed in; replaces the 3 array positions with the result //
var single_calc = function(eq, index) {
  var result = eval_operator(eq[index - 1], eq[index], eq[index + 1]);
  eq.splice(index - 1, 3, result);
  return eq;
};

//interprets string version of operator and performs function//
var eval_operator = function(val1, operator, val2) {
  switch (operator) {
    case "*":
      return val1 * val2;
      break;
    case "/":
      return val1 / val2;
      break;
    case "+":
      return val1 + val2;
      break;
     case "-":
      return val1 - val2;
      break;
    default:
      console.log("error");
    }
};

var find_ops = function(eq_array, op1, op2) {
  if (eq_array.indexOf(op1) !== -1 || eq_array.indexOf(op2) !== -1) {
    return true;
  }
}

var multiply_or_divide = function(equation) {
  var mult_position = equation.indexOf("*");
  var div_position = equation.indexOf("/");

  if (div_position === -1) {
    var index = mult_position;
    var result = single_calc(equation, index);
  }
  else if (mult_position < div_position && mult_position !== -1) {
    var index = mult_position;
    var result = single_calc(equation, index);
  } else {
    index = div_position;
    result = single_calc(equation, index);
  }
  return result;
}


var add_or_subtract = function(equation) {
  var add_position = equation.indexOf("+");
  var sub_position = equation.indexOf("-");

  if (sub_position === -1) {
    var index = add_position;
    var result = single_calc(equation, index);
  }
  else if (add_position < sub_position && add_position !== -1) {
    var index = add_position;
    var result = single_calc(equation, index);
  } else {
    index = sub_position;
    result = single_calc(equation, index);
  }
  return result;
}

//recursively runs calculations on string according to order of operations//
var interpret_calc = function(equation) {
//parses initial string argument and converts it to array //
  if (typeof(equation) !== "object") {
    equation = parse(equation);
  }

    if (find_ops(equation, "*", "/")) {
      var result = multiply_or_divide(equation);
      return interpret_calc(result);

    }
    else if (find_ops(equation, "+", "-")) {
        result = add_or_subtract(equation);
        return interpret_calc(result);

    } else {
      //rounding out any decimal places by two, if necessary//
        return Math.round(equation[0] * 100) / 100;
    }
};


//testing order of operations//
console.log("1 + 3 * 7 | Should return 22:", interpret_calc("1 + 3 * 7"))
console.log("1 + 2 / 2 * 3 | Should return 4:", interpret_calc("1 + 2 / 2 * 3"))

//testing mult and division//
console.log("1 + 7 * 4 / 2 | Should return 15:", interpret_calc("1 + 7 * 4 / 2"))

//testing floats//
console.log("1 + 2 / 6 | Should return 1.33:", interpret_calc("1 + 2 / 6"))
console.log("3 / 2 | Should return 1.5:", interpret_calc("3 / 2"))
console.log("9 + 2 / 3 | Should return 9.67:", interpret_calc("9 + 2 / 3"))

//testing all operators//
console.log("1 + 3 * 7 - 6 / 2 | Should return 19:", interpret_calc("1 + 3 * 7 - 6 / 2"))
console.log("1 + 1 | Should return 2:", interpret_calc("1 + 1"))
console.log("1 - 1 | Should return 0:", interpret_calc("1 - 1"))


//testing zero//
console.log("7 / 0 | Should return Infinity:", interpret_calc("7 / 0"))
console.log("1 + 7 / 0 | Should return Infinity:", interpret_calc("1 + 7 / 0"))
console.log("0 / 0 | Should return NaN:", interpret_calc("0 / 0"))


//testing extra white spaces//
console.log("Should return 15:", interpret_calc(" 1 + 7 * 4 / 2"))
console.log("Should return 23:", interpret_calc("9 + 7 * 4 / 2 "))
console.log("Should return 13:", interpret_calc("1 +     6 * 4    / 2"))
