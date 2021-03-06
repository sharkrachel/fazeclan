import React, { Component, useRef, useEffect } from 'react';
import * as d3 from "d3";
import "./CommitGraph.css";

const drawGraph = (dataset, svg, startDate, endDate) => {
    svg.selectAll("*").remove();
    const container = document.querySelector(".graphHolder");

    const xExtent = [startDate, endDate];
    const yExtent = d3.extent(dataset.map((value) => value.y));

    const margin = { top: 50, right: 50, bottom: 200, left: 50 };
    const width = container.offsetWidth - margin.left - margin.right;
    // const width = window.innerWidth - margin.left - margin.right; // Use the window's width 
    const height = container.offsetHeight - margin.top - margin.bottom; // Use the window's height

    const xScale = d3.scaleTime()
        .domain(xExtent) // input
        .range([0, width]); // output

    const yScale = d3.scaleLinear()
        .domain(yExtent) // input 
        .range([height, 0]); // output 

    // Generate Line
    const line = d3.line()
        .x(function (d) { return xScale(d.x); })
        .y(function (d) { return yScale(d.y); })
        .curve(d3.curveMonotoneX) // apply smoothing to the line

        const area = d3.area()
        .x(function (d) { return xScale(d.x); })
        .y0(height)
        .y1(function (d) { return yScale(d.y); })
        .curve(d3.curveMonotoneX) // apply smoothing to the line
        

    // Setup SVG
    svg
        .attr("width", width + margin.left + margin.right + 100)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "user-graph")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        const pathFill = svg.append("path")
        // .style("stroke", "#3f51b5")
        .style("fill", "#85A3FF")
        .style("opacity", "0")
        .datum(dataset)
        .attr("class", "line") // Assign a class for styling 
        .transition()
        .delay(1950)
        .duration(5000)
        .style("opacity", ".4")
        .attr("d", area) // Calls the line generator 

    // Add the path (the line)
    const path = svg.append("path")
        .style("stroke", "#3f51b5")
        .style("fill", "none")
        .style("stroke-width", "2")
        .datum(dataset)
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line) // Calls the line generator 

    // Add dots
    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) { return xScale(new Date(d.x)) })
        .attr("cy", function (d) { return yScale(d.y) })
        .attr("r", 5)
        .style("fill", "#3f51b5")
        .on("mouseover", function (a, b, c) {

        })
        .on("mouseout", function () {

        })

    const totalLength = path.node().getTotalLength();
    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .delay(300)
        .duration(5000)
        .attr("stroke-dashoffset", 0)
    // .ease("easeLinear");
}

const CommitGraph = (props) => {
    const ref = useRef();
    const { data } = props;
    const daysToShow = 30;
    const endDate = new Date();
    let startDate = new Date();
    startDate = startDate.setDate(startDate.getDate() - daysToShow);

    useEffect(() => {
        const svg = d3.select(ref.current)

        let dataset = data.map((item) => {
            return { x: new Date(item.date), y: item.contributionCount }
        });

        dataset = dataset.filter((value) => {
            return value.x > startDate;
        });

        window.addEventListener("resize", () => {

            drawGraph(dataset, svg, startDate, endDate)
        })

        drawGraph(dataset, svg, startDate, endDate)
    });
    return (
        <div className="graphHolder">
            <h3 className="graphLabel">Daily Commit History (30 days)</h3>
            <svg ref={ref} />
        </div>
    )
}

export default CommitGraph;