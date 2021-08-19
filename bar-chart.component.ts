import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import * as Chart from 'chart.js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {
  // @ts-ignore
  @ViewChild('mychart') mychart;

  canvas: any;
  ctx: any;
  selectedLabel: any;
  barChartOptions: ChartOptions;
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits'}
  ];

  constructor(public router: Router) {
    // @ts-ignore

  }

  chartClick(e, chart) {
    if (true) {
      const base = this.canvas[0]._model.y;
      if (e.pageX > base) {
        const left = this.canvas.chartArea.left;
        const point = Chart.helpers.getRelativePosition(e, this.canvas);
        const b = point.x;
        const xIndex = this.canvas.scales['y-axis-0'].getValueForPixel(point.y);
        if (b <= left) {
          const label = this.canvas.data.labels[xIndex];
          if (label) {
            this.router.navigate(['/selectedLabel'], {queryParams: {val: this.selectedLabel}});
            //     alert(label);
            console.log(label + ' at index ' + xIndex);
          }
        } else {
          alert('bar chart custom Hover');
        }
      }
    }
  }

  ngOnInit(): void {
    this.barChartOptions = {

      responsive: true,
      tooltips: {enabled: false},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'blue' // y-Axes color you want to add
          },
        }],
        xAxes: [{
          ticks: {
            fontColor: 'green'// y-Axes color you want to add
          },
        }]
      },
      onClick: (event?: any, activeElements?: Array<any>) => {
        if (this.isLabelSelected(event, activeElements)) {
          this.router.navigate(['/selectedLabel'], {queryParams: {val: this.selectedLabel}});
        } else {
          alert('bar chart custom Hover');
        }
      },
      onHover: (event?: any, activeElements?: Array<any>) => {
        if (this.isLabelSelected(event, activeElements)) {
          event.target.style.cursor = 'pointer';
        } else {
          event.target.style.cursor = 'default';
        }
      },
    };
  }

  isLabelSelected(e?: any, activeElements?: Array<any>) {
    if (activeElements) {
      const base = activeElements[0]._model.y;
      if (e.pageX > base) {
        const left = activeElements[0]._chart.chartArea.left;
        const point = Chart.helpers.getRelativePosition(e, activeElements[0]._chart);
        const xIndex = activeElements[0]._chart.scales['y-axis-0'].getValueForPixel(point.y);
        if (point.x <= left) {
          const label = this.barChartLabels[xIndex];
          if (label) {
            this.selectedLabel = label;
            return true;
          }
        } else {
          return false;
        }
      }
    }
  }

  /*  ngAfterViewInit() {
      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      const subPerf = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          datasets: [{
            label: 'My Dataset',
            backgroundColor: 'rgba(255, 99, 132,0.4)',
            borderColor: 'rgb(255, 99, 132)',
            fill: true,
            data: [10, 12, 6, 5, 11, 7, 9]
          }]
        },
        options: {
          responsive: true,
          onClick: event => {
            const point = Chart.helpers.getRelativePosition(event, subPerf.chart);
            const xIndex = subPerf.scales['x-axis-0'].getValueForPixel(point.x);
            const label = subPerf.data.labels[xIndex];
            console.log(label + ' at index ' + xIndex);
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }*/
}
