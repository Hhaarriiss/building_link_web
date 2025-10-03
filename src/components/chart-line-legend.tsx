"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart with a legend"

interface ChartAreaLegendProps {
  data: Array<Record<string, any>>;
  config: ChartConfig;
  xAxisKey?: string;
}

export function ChartAreaLegend({ 
  data, 
  config,
  xAxisKey = "month"
}: ChartAreaLegendProps) {
  // Get all data keys except the x-axis key
  const dataKeys = data.length > 0 
    ? Object.keys(data[0]).filter(key => key !== xAxisKey)
    : [];

  return (
    <>
      <ChartContainer config={config}>
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          {dataKeys.map((key, index) => (
            <Area
              key={key}
              dataKey={key}
              type="natural"
              fill={`var(--color-${key})`}
              fillOpacity={0.4}
              stroke={`var(--color-${key})`}
              stackId="a"
            />
          ))}
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </>
  )
}
