/*
 * @Title: Test.js
 * @Prject: Range List
 * @Description: This file is a test program for RangeList.js.
 * @Author: Sujia Yin
 * @Date: 2020-06-12 22:54:14
 * @Version: 1.0
 */ 

 var RangeList = require("../models/RangeList.js");
 var expect = require('chai').expect;

 var app = new RangeList();

 describe("Input format test:", function() {
     it("Input should not be an empty array", function() {
         expect(app.add([])).to.not.be.ok;
         expect(app.remove([])).to.not.be.ok;
     });
     it("Left boundary should be less than right boundary", function() {
        expect(app.add([9, 1])).to.not.be.ok;
        expect(app.remove([8, 3])).to.not.be.ok;
    });
    it("Elements of input array should not be more than 2", function() {
        expect(app.add([0, 1, 6])).to.not.be.ok;
        expect(app.remove([3, 8, 24])).to.not.be.ok;
    });
    it("Elements of input array should not be less than 2", function() {
        expect(app.add([8])).to.not.be.ok;
        expect(app.remove([1])).to.not.be.ok;
    });
    it("Negative boundries should be OK", function() {
        expect(app.add([-10, -3])).to.be.ok;
        expect(app.remove([-20, -3])).to.be.ok;
    });
 });

 describe("Massive inputs test:", function() {
    it("Adding method should not throw exception under massive inputs", function() {
        let result = true;
        for(let i = -100000; i < 100000; ++i) {
            result &= app.add([i, i + 3]);
        }
        expect(result).to.be.ok;
    });
    it("Adding method should not throw exception under massive inputs", function() {
        let result = true;
        for(let i = 100000; i > -100000; --i) {
            result &= app.remove([i - 5, i]);
        }
        expect(result).to.be.ok;
    });
});