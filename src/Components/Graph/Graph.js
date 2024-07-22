import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

import Select from 'react-select';

import updatedData from './graphsData.json';

import previousData from './originalData.json';

import './Graph.css';

import * as am4core from '@amcharts/amcharts4/core';

import * as am4charts from '@amcharts/amcharts4/charts';

import * as am4themes_animated from '@amcharts/amcharts4/themes/animated';

 

am4core.useTheme(am4themes_animated.default);

 

const ChartComponent = () => {

  const [chartData, setChartData] = useState([]);

  const [selectedAssets, setSelectedAssets] = useState([]);

  const [selectedYear, setSelectedYear] = useState('');

  const chartRef = useRef(null);

 

  const [chartData2, setChartData2] = useState([]);

  const chartRef2 = useRef(null);

 

  const [donutData, setDonutData] = useState([]);

  const donutRef = useRef(null);

 

  useEffect(() => {

    updateChartData(selectedAssets, selectedYear);

    updateChartData2(selectedAssets, selectedYear);

    updateDonutChartData(selectedYear);

  }, [selectedAssets, selectedYear]);

 

  useEffect(() => {

    const validYears = updatedData.map(item => item.Year).filter(year => year !== undefined);

    const latestYear = Math.max(...validYears);

    if (latestYear !== -Infinity) {

      setSelectedYear(latestYear.toString());

    }

  }, []);

 

  const updateChartData = (selectedAssets, selectedYear) => {

    let filteredData = updatedData;

    if (selectedAssets.length > 0) {

      filteredData = filteredData.filter(item => selectedAssets.includes(item.Item));

    }

    if (selectedYear) {

      filteredData = filteredData.filter(item => item.Year.toString() === selectedYear);

    }

 

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const template = months.map((month, index) => ({

      month,

      monthNum: index + 1,

      ...selectedAssets.reduce((acc, asset) => ({ ...acc, [asset]: 0 }), {})

    }));

 

    const groupedData = filteredData.reduce((acc, curr) => {

      const { Month_Num, Item, result_rand } = curr;

      const key = `${Month_Num}`;

      if (!acc[key]) {

        acc[key] = { monthNum: Month_Num, month: months[Month_Num - 1], [Item]: result_rand };

      } else {

        acc[key][Item] = (acc[key][Item] || 0) + result_rand;

      }

      return acc;

    }, {});

 

    const mergedData = template.map(templateItem => {

      const key = `${templateItem.monthNum}`;

      return groupedData[key] ? { ...templateItem, ...groupedData[key] } : templateItem;

    });

 

    setChartData(mergedData);

  };

 

  const updateChartData2 = (selectedAssets, selectedYear) => {

    let filteredUpdatedData2 = updatedData;

    let filteredPreviousData2 = previousData;

 

    if (selectedAssets.length > 0) {

      filteredUpdatedData2 = filteredUpdatedData2.filter(item => selectedAssets.includes(item.Item));

      const previousYear2 = (parseInt(selectedYear) - 1).toString();

      filteredPreviousData2 = filteredPreviousData2.filter(item => selectedAssets.includes(item.Item) && item.Year.toString() === previousYear2);

    }

    if (selectedYear) {

      filteredUpdatedData2 = filteredUpdatedData2.filter(item => item.Year.toString() === selectedYear);

    }

 

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const template2 = months.map((month, index) => ({

      month,

      monthNum: index + 1,

      ...selectedAssets.reduce((acc, asset) => ({

        ...acc,

        [`${asset}_updated2`]: 0,

        [`${asset}_previous2`]: 0

      }), {})

    }));

 

    const groupedUpdatedData2 = filteredUpdatedData2.reduce((acc, curr) => {

      const { Month_Num, Item, result_rand } = curr;

      const key = `${Month_Num}`;

      if (!acc[key]) {

        acc[key] = { monthNum: Month_Num, month: months[Month_Num - 1], [`${Item}_updated2`]: result_rand };

      } else {

        acc[key][`${Item}_updated2`] = result_rand;

      }

      return acc;

    }, {});

 

    const groupedPreviousData2 = filteredPreviousData2.reduce((acc, curr) => {

      const { Month_num, Item, result_rand } = curr;

      const key = `${Month_num}`;

      if (!acc[key]) {

        acc[key] = { monthNum: Month_num, month: months[Month_num - 1], [`${Item}_previous2`]: result_rand };

      } else {

        acc[key][`${Item}_previous2`] = result_rand;

      }

      return acc;

    }, {});

 

    const mergedData2 = template2.map(templateItem => {

      const key = `${templateItem.monthNum}`;

      return {

        ...templateItem,

        ...groupedUpdatedData2[key],

        ...groupedPreviousData2[key]

      };

    });

 

    setChartData2(mergedData2);

  };

 

  const updateDonutChartData = (selectedYear) => {

    let filteredData = updatedData;

    if (selectedYear) {

      filteredData = filteredData.filter(item => item.Year.toString() === selectedYear);

    }

 

    const assetCounts = filteredData.reduce((acc, curr) => {

      const { Item, result_rand } = curr;

      if (!acc[Item]) {

        acc[Item] = 0;

      }

      acc[Item] += result_rand;

      return acc;

    }, {});

 

    const sortedAssets = Object.keys(assetCounts)

      .map(asset => ({ asset, count: assetCounts[asset] }))

      .sort((a, b) => b.count - a.count)

      .slice(0, 5);

 

    setDonutData(sortedAssets.map(item => ({

      category: item.asset,

      value: item.count,

    })));

  };

 

  const assetOptions = [...new Set(updatedData.map(item => item.Item))].map(asset => ({

    value: asset,

    label: asset,

  }));

 

  const yearOptions = [...new Set(updatedData.map(item => item.Year))]

    .filter(year => year !== undefined)

    .map(year => ({

      value: year.toString(),

      label: year.toString(),

    }));

 

  useLayoutEffect(() => {

    let chart = am4core.create('chartdiv', am4charts.XYChart);

    chart.paddingRight = 20;

    chart.logo.disabled = true;

 

    chart.data = chartData;

 

    let title1 = chart.titles.create();

    title1.text = "Assets Predicted";

    title1.paddingBottom = 12;

    title1.fontSize = 17;

    title1.fontWeight = "bold";

 

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());

    categoryAxis.dataFields.category = 'month';

    categoryAxis.renderer.grid.template.location = 0;

    categoryAxis.renderer.minGridDistance = 0;

    categoryAxis.renderer.labels.template.rotation = 1;

    categoryAxis.renderer.labels.template.verticalCenter = 'middle';

    categoryAxis.start = 0;

    categoryAxis.renderer.grid.template.disabled = true;

    categoryAxis.title.text = "Months";

    categoryAxis.title.fontWeight = "bold";

 

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.min = 0;

    valueAxis.title.text = "Predicted no. of units";

    valueAxis.title.fontWeight = "bold";

 

    const colors = [

      am4core.color("#67b7dc"),

      am4core.color("#6794dc"),

      am4core.color("#6771dc")

    ];

 

    selectedAssets.forEach((asset, index) => {

      let series = chart.series.push(new am4charts.ColumnSeries());

      series.dataFields.valueY = asset;

      series.dataFields.categoryX = 'month';

      series.name = asset;

      series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/] ({year})';

      series.columns.template.fill = colors[index % colors.length];

 

      series.tooltip.getFillFromObject = false;

      series.tooltip.background.fill = am4core.color("#0000ff");

      series.tooltip.label.fill = am4core.color("#ffffff");

 

      series.columns.template.adapter.add("tooltipText", function(text, target) {

        if (target.dataItem) {

          const month = target.dataItem.categoryX;

          const value = target.dataItem.valueY;

          const year = selectedYear;

          return `${month}: [bold]${value}[/] (${year})`;

        }

        return text;

      });

    });

 

    chartRef.current = chart;

 

    chart.legend = new am4charts.Legend();

    chart.legend.position = "bottom";

    chart.legend.labels.template.maxWidth = 95;

 

    const previousColors2 = [

      am4core.color("#b428b2"),

      am4core.color("#7528b4"),

      am4core.color("#b43128")

    ];

 

    let chart2 = am4core.create('chartdiv2', am4charts.XYChart);

    chart2.paddingRight = 20;

    chart2.logo.disabled = true;

 

    chart2.data = chartData2;

 

    let title2 = chart2.titles.create();

    title2.text = "Assets Updated vs Previous Data";

    title2.paddingBottom = 12;

    title2.fontSize = 17;

    title2.fontWeight = "bold";

 

    let categoryAxis2 = chart2.xAxes.push(new am4charts.CategoryAxis());

    categoryAxis2.dataFields.category = 'month';

    categoryAxis2.renderer.grid.template.location = 0;

    categoryAxis2.renderer.minGridDistance = 0;

    categoryAxis2.renderer.labels.template.rotation = 1;

    categoryAxis2.renderer.labels.template.verticalCenter = 'middle';

    categoryAxis2.start = 0;

    categoryAxis2.renderer.grid.template.disabled = true;

    categoryAxis2.title.text = "Months";

    categoryAxis2.title.fontWeight = "bold";

 

    let valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());

    valueAxis2.min = 0;

    valueAxis2.title.text = "no. of units";

    valueAxis2.title.fontWeight = "bold";

 

    selectedAssets.forEach((asset, index) => {

      let seriesUpdated = chart2.series.push(new am4charts.LineSeries());

      seriesUpdated.dataFields.valueY = `${asset}_updated2`;

      seriesUpdated.dataFields.categoryX = 'month';

      seriesUpdated.name = `${asset.substring(0, 15)} (Predicted)`;

      seriesUpdated.stroke = colors[index % colors.length];

      seriesUpdated.strokeWidth = 2;

      seriesUpdated.tooltipText = '{categoryX}: [bold]{valueY}[/] ({year})';

      seriesUpdated.fillOpacity = 0.2;

      seriesUpdated.fill = seriesUpdated.stroke;

 

      seriesUpdated.tooltip.getFillFromObject = false;

      seriesUpdated.tooltip.background.fill = am4core.color("#0000ff");

      seriesUpdated.tooltip.label.fill = am4core.color("#ffffff");

 

      seriesUpdated.adapter.add("tooltipText", function(text, target) {

        if (target.dataItem) {

          const month = target.dataItem.categoryX;

          const value = target.dataItem.valueY;

          const year = selectedYear;

          return `${month}: [bold]${value}[/] (${year})`;

        }

        return text;

      });

 

      let bullet = seriesUpdated.bullets.push(new am4charts.CircleBullet());

      bullet.circle.strokeWidth = 2;

      bullet.circle.radius = 4;

      bullet.circle.fill = seriesUpdated.stroke;

 

      let seriesPrevious = chart2.series.push(new am4charts.LineSeries());

      seriesPrevious.dataFields.valueY = `${asset}_previous2`;

      seriesPrevious.dataFields.categoryX = 'month';

      seriesPrevious.name = `${asset.substring(0, 15)} (Previous)`;

      seriesPrevious.stroke = colors[(index + 1) % colors.length];

      seriesPrevious.strokeWidth = 2;

      seriesPrevious.tooltipText = '{categoryX}: [bold]{valueY}[/] ({year})';

 

      seriesPrevious.fillOpacity = 0.2;

      seriesPrevious.fill = seriesPrevious.stroke;

      seriesPrevious.tooltip.getFillFromObject = false;

      seriesPrevious.tooltip.background.fill = am4core.color("#ff0000");

      seriesPrevious.tooltip.label.fill = am4core.color("#ffffff");

      seriesPrevious.stroke = previousColors2[index % previousColors2.length];

 

      seriesPrevious.adapter.add("tooltipText", function(text, target) {

        if (target.dataItem) {

          const month = target.dataItem.categoryX;

          const value = target.dataItem.valueY;

          const year = selectedYear;

          return `${month}: [bold]${value}[/] (${year})`;

        }

        return text;

      });

 

      let bulletPrev = seriesPrevious.bullets.push(new am4charts.CircleBullet());

      bulletPrev.circle.strokeWidth = 2;

      bulletPrev.circle.radius = 4;

      bulletPrev.circle.fill = seriesPrevious.stroke;

    });

 

    chartRef2.current = chart2;

 

    chart2.legend = new am4charts.Legend();

    chart2.legend.position = "bottom";

    chart2.legend.labels.template.maxWidth = 95;

 

    // Create donut chart

    let donutChart = am4core.create('donutChartDiv', am4charts.PieChart);

    donutChart.data = donutData;

 

    let title3 = donutChart.titles.create();

    title3.text = "Top 5 Assets by Count";

    title3.paddingBottom = 12;

    title3.fontSize = 17;

    title3.fontWeight = "bold";

 

    let pieSeries = donutChart.series.push(new am4charts.PieSeries());

    pieSeries.dataFields.value = 'value';

    pieSeries.dataFields.category = 'category';

    pieSeries.slices.template.tooltipText = '{category}: [bold]{value}[/]';

 

    pieSeries.labels.template.fill = am4core.color("#000000");

    // donutChart.legend.labels.template.fill = am4core.color("#ffffff");

    donutChart.logo.disabled=true;

 

    pieSeries.slices.template.fillOpacity = 0.8;

    pieSeries.slices.template.strokeWidth = 0;

 

    donutRef.current = donutChart;

 

    return () => {

      chart.dispose();

      chart2.dispose();

      donutChart.dispose();

    };

  }, [chartData, chartData2, donutData, selectedYear, selectedAssets]);

 

  return (

    <div>

      <div className="container">

        <div className="selectors">

          <Select

            id="assets-select"

            isMulti

            options={assetOptions}

            value={selectedAssets.map(asset => ({ value: asset, label: asset }))}

            onChange={selectedOptions => {

              if (selectedOptions.length <= 3) {

                setSelectedAssets(selectedOptions.map(option => option.value));

              }

            }}

          />

          <Select

            id="year-select"

            options={yearOptions}

            value={{ value: selectedYear, label: selectedYear }}

            onChange={selectedOption => setSelectedYear(selectedOption.value)}

          />

        </div>

        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>

      </div>

      <div className="container">

        <div id="chartdiv2" style={{ width: '100%', height: '500px' }}></div>

      </div>

      <div className="container">

        <div id="donutChartDiv" style={{ width: '98%', height: '500px' }}></div>

      </div>

      {/* <div className='footer ft1'>

        © 2024 Wipro | Privacy Policy

      </div> */}

    </div>

  );

};

 

export default ChartComponent;