<template>
  <el-form :model="formData" ref="ruleFormRef">
    <el-row :gutter="24">
      <template v-for="item in formItemAttrs" :key="item.prop">
        <el-col v-bind="item.col">
          <el-form-item :label="item.label" :prop="item.prop">
            <component
              v-model="formData[item.prop]"
              :is="isComb(item.comb)"
              :placeholder="item.placeholder"
            >
              <template v-if="item.comb === 'select'">
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </template>
            </component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-row>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button type="info" @click="handleReset(ruleFormRef)">重置</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

const props = defineProps({
  formItem: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["search"]);

const formItemAttrs = computed(() => {
  const { formItem } = props;
  formItem.forEach((item) => {
    // 一行24个网格布局，24/设置的列数就是一行几个
    item.col = { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 };
  });
  return formItem;
});

const ruleFormRef = ref(null);

// 表单数据
const formData = reactive({});
// 根据comb判断是否是input或select
const isComb = (comb) => {
  // 映射map
  return { input: "el-input", select: "el-select" }[comb];
};
// 查询
const handleSearch = () => {
  emit("search", formData);
};
// 重置
const handleReset = (formEL) => {
  if (!formEL) return;
  formEL.resetFields();
  handleSearch();
};
</script>
