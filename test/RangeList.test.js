/*
 * @Title: Test.js
 * @Prject: Range List
 * @Description: This file is a unit test program for RangeList.js.
 * @Author: Sujia Yin
 * @Date: 2020-06-12 22:54:14
 * @Version: 1.0
 */ 

var app = require("../dist/app.js");
var expect = require('chai').expect;

describe("Input format test:", function() {
    it("Input should not be an empty array", function() {
        expect(app.add([])).to.not.be.ok;
        expect(app.remove([])).to.not.be.ok;
        app.clear();
    });
    it("Left boundary should be less than right boundary", function() {
        expect(app.add([9, 1])).to.not.be.ok;
        expect(app.remove([8, 3])).to.not.be.ok;
        app.clear();
    });
    it("Elements of input array should not be more than 2", function() {
        expect(app.add([0, 1, 6])).to.not.be.ok;
        expect(app.remove([3, 8, 24])).to.not.be.ok;
        app.clear();
    });
    it("Elements of input array should not be less than 2", function() {
        expect(app.add([8])).to.not.be.ok;
        expect(app.remove([1])).to.not.be.ok;
        app.clear();
    });
    it("Negative boundries should be OK", function() {
        expect(app.add([-10, -3])).to.be.ok;
        expect(app.remove([-20, -3])).to.be.ok;
        app.clear();
    });
 });

 describe("Correctness test:", function() {
    it("Add and remove non-overlap intervals", function() {
        app.add([1, 4]);
        app.add([8, 12]);
        expect(app.rangeList[0].left).to.be.equal(1);
        expect(app.rangeList[0].right).to.be.equal(4);
        expect(app.rangeList[1].left).to.be.equal(8);
        expect(app.rangeList[1].right).to.be.equal(12);
        app.remove([8, 12]);
        expect(app.rangeList[0].left).to.be.equal(1);
        expect(app.rangeList[0].right).to.be.equal(4);
        expect(app.rangeList[1]).to.be.equal(undefined);
        app.clear();
    });
    it("Add and remove overlapped intervals", function() {
        app.add([1, 4]);
        app.add([2, 12]);
        expect(app.rangeList[0].left).to.be.equal(1);
        expect(app.rangeList[0].right).to.be.equal(12);
        expect(app.rangeList[1]).to.be.equal(undefined);
        app.remove([8, 9]);
        expect(app.rangeList[0].left).to.be.equal(1);
        expect(app.rangeList[0].right).to.be.equal(8);
        expect(app.rangeList[1].left).to.be.equal(9);
        expect(app.rangeList[1].right).to.be.equal(12);
        app.clear();
    });
    it("Add and remove zero-length intervals", function() {
        app.add([20, 35]);
        app.add([35, 35]);
        expect(app.rangeList[0].left).to.be.equal(20);
        expect(app.rangeList[0].right).to.be.equal(35);
        expect(app.rangeList[1]).to.be.equal(undefined);
        app.remove([20, 20]);
        expect(app.rangeList[0].left).to.be.equal(20);
        expect(app.rangeList[0].right).to.be.equal(35);
        expect(app.rangeList[1]).to.be.equal(undefined);
        app.clear();
    });
 });

 describe("Massive inputs test:", function() {
    it("Adding method should not throw exception under massive inputs", function() {
        let result = true;
        for(let i = -1000000; i < 1000000; ++i) {
            result &= app.add([i, i + 3]);
        }
        expect(result).to.be.ok;
        app.clear();
    });
    it("Adding method should not throw exception under massive inputs", function() {
        let result = true;
        for(let i = 1000000; i > -1000000; --i) {
            result &= app.remove([i - 5, i]);
        }
        expect(result).to.be.ok;
        app.clear();
    });
});