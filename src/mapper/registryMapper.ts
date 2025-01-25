export const registryMapper = new Map<string, string>([
  //general
  ['outdoorTemperature', '__TD9939790_REAL_.1f'],
  ['rcTariff', '__R10949.2_BOOL_i'], //0 =high, 1 = low
  ['holiday', '__R8266.1_BOOL_i'], //0 = off, 1 = on
  ['heatPumpRunningStatus', '__R12005.0_BOOL_i'],
  ['heatPumpOutletTemperature', '__R11999_INT_-4.1d'],
  ['heatPumpInletTemperature', '__R11997_INT_-4.1d'],
  ['waterRunningStatusFromHeatPump', '__R12005.5_BOOL_i'],
  ['circulationRunningStatus', '__R10949.0_BOOL_i'],
  //heat pump
  ['hpServiceEnabled', '__R26396.0_BOOL_i'],
  ['hpStatus', '__R24074_STRING[20]_s'],
  ['hpCompressor', '__R26113.0_BOOL_i'],
  ['hpRunningStatus', '__T5230DDE9_INT_-5.1d'],
  ['rps', '__T5230DDE9_INT_-5.1d'],
  ['hpRunningTime', '__R26636_TIME_Thh:mm:ss'],
  ['hpIdleTime', '__R26648_TIME_Thh:mm:ss'],
  ['hpOutletTemperature', '__R26081_INT_-5.1d'],
  ['hpInletTemperature', '__R26077_INT_-5.1d'],
  ['overallTotalHours', '__R26610_UDINT_u'],
  ['overallTotalStarts', '__R26620_UINT_u'],
  ['overallTodayHours', '__R26582_USINT_u'],
  ['overallTodayMinutes', '__R26583_UINT_u'],
  ['overallTodayStarts', '__R26622_USINT_u'],
  ['overallYesterdayHours', '__R26604_USINT_u'],
  ['overallYesterdayMinutes', '__R26605_UINT_u'],
  ['overallYesterdayStarts', '__R26623_USINT_u'],
  ['hotWaterTotalHours', '__R26614_UDINT_u'],
  ['hotWaterTotalStarts', '__R26624_UINT_u'],
  ['hotWaterTodayHours', '__R26589_USINT_u'],
  ['hotWaterTodayMinutes', '__R26590_UINT_u'],
  ['hotWaterTodayStarts', '__R26626_USINT_u'],
  ['hotWaterYesterdayHours', '__R26607_USINT_u'],
  ['hotWaterYesterdayMinutes', '__R26608_UINT_u'],
  ['hotWaterYesterdayStarts', '__R26627_USINT_u'],
  //zone1
  ['zone1Name', '__T4D45E37E_STRING[15]_s'],
  ['zone1ServiceEnabled', '__R15114.0_BOOL_i'],
  ['zone1Status', '__R15458_STRING[20]_s'],
  ['zone1StatusReason', '__R15418_STRING[39]_s'],
  ['zone1RunningStatus', '__R15153_USINT_u'],
  ['zone1Temperature', '__TA0A7A1CC_SINT_d'],
  ['zone1RequiredTemperature', '__T70BDAE66_REAL_.1f'],
  ['zone1HeatingWaterTemperature', '__R8323_REAL_.1f'],
  ['zone1RequiredHeatingWaterTemperature', '__R8429_REAL_.1f'],
  ['zone1WinterSummerModeByDateState', '__R15191.1_BOOL_i'],
  ['zone1WinterSummerModeByTemperatureState', '__R15186.0_BOOL_i'],
  ['zone1HumidityState', '__R109069.7_BOOL_i'],
  ['zone1Humidity', '__R128156_REAL_.1f'],
  //zone2
  ['zone2Name', '__R18047_STRING[15]_s'],
  ['zone2ServiceEnabled', '__R18006.0_BOOL_i'],
  ['zone2Status', '__R18350_STRING[20]_s'],
  ['zone2StatusReason', '__R18310_STRING[39]_s'],
  ['zone2RunningStatus', '__R18045_USINT_u'],
  ['zone2Temperature', '__R128170_REAL_.1f'],
  ['zone2RequiredTemperature', '__R8457_REAL_.1f'],
  ['zone2HeatingWaterTemperature', '__R8331_REAL_.1f'],
  ['zone2RequiredHeatingWaterTemperature', '__R8433_REAL_.1f'],
  ['zone2WinterSummerModeByDateState', '__R18083.1_BOOL_i'],
  ['zone2WinterSummerModeByTemperatureState', '__R18078.0_BOOL_i'],
  ['zone2HumidityState', '__R112275.7_BOOL_i'],
  ['zone2Humidity', '__R128178_REAL_.1f'],
  //aku
  ['akuTopTemperature', '__R8275_REAL_.1f'],
  ['akuBottomTemperature', '__R8389_REAL_.1f'],
  ['akuRequiredTemperature', '__R8417_REAL_.1f'],
  ['akuRunningStatusFromHeatPump', '__R156298.0_BOOL_i'],
  //water
  ['waterName', '__R22640_STRING[15]_s'],
  ['waterServiceEnabled', '__R22589.1_BOOL_i'],
  ['waterState', '__R22589.0_BOOL_i'],
  ['waterStatusOffService', '__R10018.0_BOOL_i'],
  ['waterStatusOff', '__R10018.1_BOOL_i'],
  ['waterStatusOnSetback', '__R10018.2_BOOL_i'],
  ['waterStatusOnComfort', '__R10018.3_BOOL_i'],
  ['waterSwitchingSensorTemperature', '__T29E0FB9B_REAL_.1f'], //
  ['waterComfortTemperature', '__R22600_REAL_.0f'],
  ['waterSetbackTemperature', '__R22604_REAL_.0f'],
  ['waterRequiredTemperature', '__T8C9AFCC2_INT_d'], //
  ['waterThermalStoreStatus', '__R22462.0_BOOL_i'],
  ['waterThermalStoreTemperature', '__R22451_USINT_u'],
  ['waterUseTimeProgramState', '__R22662.0_BOOL_i'],
  ['waterUseSecondPeriodState', '__R22662.1_BOOL_i'],
  //solar
  ['solarPanelTemperature', '__R8319_REAL_.1f'],
  ['solarRunningStatus', '__R12018.4_BOOL_i'],
  ['solarPower', '__R10806_SINT_d'],
  ['solarC1ServiceEnabled', '__R17432.4_BOOL_i'],
  ['solarC1State', '__R17432.1_BOOL_i'],
  ['solarC1Heating', '__R8416.0_BOOL_i'],
  ['solarC1CoolingTemperature', '__R8401_REAL_.1f'],
  ['solarC1MaximumTemperature', '__R17492_USINT_u'],
  ['solarC1RequiredTemperature', '__R17491_USINT_u'],
  ['solarC2ServiceEnabled', '__R17432.5_BOOL_i'],
  ['solarC2State', '__R17432.2_BOOL_i'],
  ['solarC2Heating', '__R8416.1_BOOL_i'],
  ['solarC2CoolingTemperature', '__R8405_REAL_.1f'],
  ['solarC2MaximumTemperature', '__R17494_USINT_u'],
  ['solarC2RequiredTemperature', '__R17493_USINT_u'],
  ['solarC3ServiceEnabled', '__R17432.6_BOOL_i'],
  ['solarC3State', '__R17432.3_BOOL_i'],
  ['solarC3Heating', '__R8416.2_BOOL_i'],
  ['solarC3CoolingTemperature', '__R8409_REAL_.1f'],
  ['solarC3MaximumTemperature', '__R17496_USINT_u'],
  ['solarC3RequiredTemperature', '__R17495_USINT_u'],
  ['solarPumpStatus', '__R17775_STRING[20]_s'],
  //recirculation
  ['recirculationServiceEnabled', '__R18395.0_BOOL_i'],
  ['recirculationState', '__R18395.1_BOOL_i'],
  ['recirculationPeriod', '__R18396_USINT_u'],
  ['recirculationDelay', '__R18397_USINT_u'],
  ['recirculationImmediatePeriod', '__R18416_USINT_u'],
  ['recirculationImmediateState', '__R18398.0_BOOL_i'],
  ['recirculationUseTimeProgramState', '__R18432.0_BOOL_i'],
  ['recirculationUseSecondPeriodState', '__R18432.1_BOOL_i'],
  // sensor
  ['outdoorTemperatureSensor', '__R43465_REAL_.1f'],
  ['zone1TemperatureSensor', '__R43545_REAL_.1f'],
  ['zone2TemperatureSensor', '__R43625_REAL_.1f'],
  ['zone1HeatingWaterTemperatureSensor', '__R43705_REAL_.1f'],
  ['zone2HeatingTemperatureSensor', '__R43785_REAL_.1f'],
  ['akuTopTemperatureSensor', '__R43865_REAL_.1f'],
  ['akuBottomTemperatureSensor', '__R44265_REAL_.1f'],
  ['waterTemperatureSensor', '__R43945_REAL_.1f'],
  ['solarTemperatureSensor', '__R44745_REAL_.1f'],
]);
