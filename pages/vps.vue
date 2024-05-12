<template>
  <SectionHead class="w-full px-10" title="vps" />
  <div class="w-full">
    <vxe-table :data="vps" stripe>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column
        field="supplier"
        title="厂商"
        :filters="supplierOptions"
      ></vxe-column>
      <vxe-column field="product" title="型号"></vxe-column>
      <vxe-column
        field="cpu"
        title="Cpu(核)"
        sortable
        :filters="cpuOptions"
      ></vxe-column>
      <vxe-column
        field="ram"
        title="Ram(GB)"
        sortable
        :filters="ramOptions"
      ></vxe-column>
      <vxe-column
        field="location"
        title="地区"
        :filters="locationOptions"
      ></vxe-column>
      <vxe-column
        field="price_month"
        title="月付"
        :sort-by="price_month_sort"
        :formatter="price_month_formatter"
        sortable
      ></vxe-column>
      <vxe-column
        field="price_year"
        title="年付"
        :sort-by="price_year_sort"
        :formatter="price_year_formatter"
        sortable
      ></vxe-column>
      <vxe-column field="bandwidth" title="流量(GB)" sortable></vxe-column>
      <vxe-column field="port_speed" title="带宽(Mbps)" sortable></vxe-column>
      <vxe-column field="ssd" title="SSD(GB)" sortable></vxe-column>
      <vxe-column field="hdd" title="HDD(GB)" sortable></vxe-column>
      <vxe-column field="remark" title="备注"></vxe-column>
    </vxe-table>
  </div>
  <div class="w-full">
    <Waline
      :serverURL="$config.public.walineUrl"
      :path="$route.path"
      login="disable"
      lang="zh-CN"
    />
  </div>
</template>

<script lang="ts" setup>
import type { VxeColumnPropTypes } from "vxe-table";
import "vxe-table/lib/style.css";
const currencyMap = ref({
  UDS: 1,
  CNY: 7.235,
  CAD: 1.374,
  EUR: 0.929,
});
onMounted(() => {
  fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=usd&tsyms=cny,cad,eur,usd",
  )
    .then((res) => res.json())
    .then((data) => {
      currencyMap.value = data;
    });
});
const { getItems } = useDirectusItems();
type Vps = {
  id: number;
  supplier: string;
  product: string;
  cpu: number;
  ram: number;
  location: string;
  price_month: number;
  price_year: number;
  bandwidth: number;
  port_speed: number;
  remark: string;
  currency: "CNY" | "CAD" | "EUR";
};
const { data: vps } = await useAsyncData(
  "vps",
  () =>
    getItems<Vps>({
      collection: "vps",
      params: {
        fields: ["*"],
      },
    }),
  {
    default: () => [],
  },
);
const price_month_sort: VxeColumnPropTypes.SortBy<Vps> = ({ row }) => {
  if (row.price_month === null) {
    return (currencyMap.value[row.currency] * row.price_year) / 12;
  }
  return currencyMap.value[row.currency] * row.price_month;
};
const price_month_formatter: VxeColumnPropTypes.Formatter<Vps> = ({ row }) => {
  if (row.price_month === null) {
    return `${row.price_year} / 12 ≈ ${(row.price_year / 12).toFixed(2)} ${row.currency}`;
  }
  return `${row.price_month} ${row.currency}`;
};
const price_year_sort: VxeColumnPropTypes.SortBy<Vps> = ({ row }) => {
  if (row.price_year === null) {
    return currencyMap.value[row.currency] * row.price_month * 12;
  }
  return currencyMap.value[row.currency] * row.price_year;
};
const price_year_formatter: VxeColumnPropTypes.Formatter<Vps> = ({ row }) => {
  if (row.price_year === null) {
    return `${row.price_month} * 12 ≈ ${(row.price_month * 12).toFixed(2)}`;
  }
  return `${row.price_year} ${row.currency}`;
};
const supplierOptions = ref(
  useUniq(vps.value.map((v) => v.supplier)).map((v) => ({
    label: v,
    value: v,
  })),
);
const locationOptions = ref(
  useUniq(vps.value.map((v) => v.location)).map((v) => ({
    label: v,
    value: v,
  })),
);
const cpuOptions = ref(
  useUniq(vps.value.map((v) => v.cpu))
    .sort((a, b) => a - b)
    .map((v) => ({
      label: v,
      value: v,
    })),
);
const ramOptions = ref(
  useUniq(vps.value.map((v) => v.ram))
    .sort((a, b) => a - b)
    .map((v) => ({
      label: v,
      value: v,
    })),
);
</script>

<style></style>
