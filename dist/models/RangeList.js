"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @Title: RangeList.js
 * @Prject: Range List
 * @Description: This file defines the structure and API of a range list.
 * @Author: Sujia Yin
 * @Date: 2020-06-12 18:18:56
 * @Version: V1.0
 */

/**
 * @ClassName: Interval
 * @Description: This is a class for an interval which is denoted by two boundaries.
 * @Author: Sujia Yin
 * @Date: 2020-06-12
 * @Version: V1.0
 */
var Interval = function Interval(left, right) {
    _classCallCheck(this, Interval);

    this.left = left;
    this.right = right;
};

/**
 * @description: Print the interval.
 * @param {} 
 * @return {string}
 * @author: Sujia Yin
 */


Interval.prototype.printInterval = function () {
    return "[" + this.left + ", " + this.right + ") ";
};

/**
 * @ClassName: RangeList
 * @Description: This is a class for a range list which is composed by multiple intervals.
 * @Author: Sujia Yin
 * @Date: 2020-06-12
 * @Version: V1.0
 */

var RangeList = function RangeList() {
    _classCallCheck(this, RangeList);

    // Initialize an array to track intervals.
    this.rangeList = [];
};

/**
 * @description: Adds a range to the range list.
 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
 * @return {Boolean}
 * @author: Sujia Yin
 */


RangeList.prototype.add = function (range) {
    if (!checkInput.call(this, range)) return false;

    var left = range[0];
    var right = range[1];

    // Set up a new array to store the tracked intervals.
    var newRange = [];

    var i = 0,
        itv = void 0;
    try {
        for (; i < this.rangeList.length; ++i) {
            itv = this.rangeList[i];

            // Search to the end, terminate the current loop.
            if (itv.left > right) break;

            // There is no overlap between the current interval and the input range, 
            // push the current interval into the new array directly.
            if (itv.right < left) {
                newRange.push(itv);
            }

            // There is overlap between the current interval and the input range, merge the range.
            else {
                    left = Math.min(left, itv.left);
                    right = Math.max(itv.right, right);
                }
        }

        // Add the merged new range int to the new range list.
        newRange.push(new Interval(left, right));

        // Add the left intervals in the old range list to the new range list.
        if (i < this.rangeList.length) {
            newRange.push.apply(newRange, _toConsumableArray(this.rangeList.slice(i)));
        }
    } catch (e) {
        console.log("Error: Cannot add range: ", e);
        return false;
    }

    this.rangeList = newRange;
    return true;
};

/**
 * @description: Removes a range from the list.
 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
 * @return {Boolean}
 * @author: Sujia Yin
 */
RangeList.prototype.remove = function (range) {
    if (!checkInput.call(this, range)) return false;

    var left = range[0];
    var right = range[1];

    // If the input range is out of the tracked range list, return true directly.
    if (this.rangeList.length === 0 || left > this.rangeList[this.rangeList.length - 1].right || right < this.rangeList[0].left) return true;

    var newRange = [];

    var i = 0,
        itv = void 0;
    try {
        for (; i < this.rangeList.length; ++i) {
            itv = this.rangeList[i];

            // Search to the end, terminate the current loop.
            if (itv.left >= right) break;

            // There is no overlap between the current interval and the input range, 
            // push the current interval into the new array directly.
            if (itv.right < left) {
                newRange.push(itv);
            } else {

                // If the overlap is on the right side of current interval, keep the left part.
                if (itv.left < left) {
                    newRange.push(new Interval(itv.left, left));
                }

                // If the overlap is on the left side of current interval, keep the right part.
                if (itv.right > right) {
                    newRange.push(new Interval(right, itv.right));
                }
            }
        }

        // Add the left intervals in the old range list to the new range list.
        if (i < this.rangeList.length) {
            newRange.push.apply(newRange, _toConsumableArray(this.rangeList.slice(i)));
        }
    } catch (e) {
        console.log("Error: Cannot remove range: ", e);
        return false;
    }

    this.rangeList = newRange;
    return true;
};

/**
 * @description: Print all the tracked range in the list.
 * @param {} 
 * @return: None
 * @author: Sujia Yin
 */
RangeList.prototype.print = function () {
    var output = "";
    for (var i = 0; i < this.rangeList.length; ++i) {
        output += this.rangeList[i].printInterval();
    }
    console.log(output);
};

/**
 * @description: Clear the range list.
 * @param {} 
 * @return: None
 * @author: Sujia Yin
 */
RangeList.prototype.clear = function () {
    this.rangeList = [];
};

/**
 * @description: Check whether the input range is valid.
 * @param {Array<Number>} range - Array of two integers that specify beginning and end of range.
 * @return {Boolean}
 * @author: Sujia Yin
 */
function checkInput(range) {
    if (range.length != 2 || range[0] > range[1]) {
        console.log("Input range is invalid!");
        return false;
    }
    return true;
}

exports.default = RangeList;