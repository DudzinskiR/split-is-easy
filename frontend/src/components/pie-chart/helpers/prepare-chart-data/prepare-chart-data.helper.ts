import { PieChartData } from "../../interface/pie-chart-data.interface";
import { SegmentData } from "../../interface/segment-data.interface";

export const prepareChartData = (
  data: PieChartData[],
  maxSegmentCount: number,
  minAngle: number
) => {
  const sum = calculateSum(data);

  if (sum === 0) {
    const newSegmentsData: SegmentData[] = [
      {
        value: 0,
        label: "",
        angle: 360,
      },
    ];

    return newSegmentsData;
  }

  let segmentsData = createSegmentsData(data, sum);
  segmentsData.sort((a: SegmentData, b: SegmentData) => {
    return a.angle - b.angle;
  });
  segmentsData.reverse();

  segmentsData = limitAndSumSegments(segmentsData, maxSegmentCount, sum);
  segmentsData = adjustAngle(segmentsData, minAngle, sum);
  return segmentsData;
};

const calculateSum = (data: PieChartData[]) => {
  return data.reduce((acc: number, curr: PieChartData) => acc + curr.value, 0);
};

const createSegmentsData = (
  data: PieChartData[],
  sum: number
): SegmentData[] => {
  const segmentsData: SegmentData[] = [];

  for (const item of data) {
    segmentsData.push({
      value: item.value,
      label: item.label,
      angle: (item.value / sum) * 360,
    });
  }

  return segmentsData;
};

const limitAndSumSegments = (
  segmentsData: SegmentData[],
  maxSegmentCount: number,
  sum: number
) => {
  if (segmentsData.length <= maxSegmentCount) {
    return segmentsData;
  }

  const sumOtherValues = segmentsData
    .slice(maxSegmentCount - 1)
    .reduce((acc: number, curr: SegmentData) => (acc += curr.value), 0);

  const newSegmentsData: SegmentData[] = [
    ...segmentsData.slice(0, maxSegmentCount - 1),
    {
      value: sumOtherValues,
      label: ``,
      angle: (sumOtherValues / sum) * 360,
    },
  ];

  return newSegmentsData;
};

const adjustAngle = (
  segmentsData: SegmentData[],
  minAngle: number,
  sum: number
) => {
  let additionalAngle = 0;
  let additionalValue = 0;
  const newSegmentsData = [...segmentsData];
  for (const item of newSegmentsData) {
    if (item.angle < minAngle) {
      additionalAngle += minAngle;
      additionalValue += item.value;
      item.angle = minAngle;
    }
  }

  if (additionalAngle === 0) {
    return newSegmentsData;
  }

  for (const item of newSegmentsData) {
    if (item.angle > minAngle) {
      item.angle =
        (360 - additionalAngle) * (item.value / (sum - additionalValue));
    }
  }

  return newSegmentsData;
};
