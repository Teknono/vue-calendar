export const numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

var NUMBER_GROUPS = /(-?\d*\.?\d+)/g;

export const naturalSort = function (a, b, asc) {
  var aa = String(a).split(NUMBER_GROUPS),
      bb = String(b).split(NUMBER_GROUPS),
      min = Math.min(aa.length, bb.length);

  for (var i = 0; i < min; i++) {
    var x = parseFloat(aa[i]) || aa[i].toLowerCase(),
        y = parseFloat(bb[i]) || bb[i].toLowerCase()

    if(asc) {
      [x, y] = [y, x]
    }
    if (x < y) {
      return -1
    } else if (x > y) {
      return 1
    }
  }

  return 0
}
