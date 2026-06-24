<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/50 to-gray-900 p-4">
    <!-- 顶部导航 -->
    <div class="bg-black/50 backdrop-blur-md border-b border-purple-800/30 rounded-lg mb-4">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500">
              <span class="text-2xl">⭐</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                七星彩
              </h1>
              <p class="text-xs text-gray-400">官方开奖平台</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-mono text-purple-400">{{ currentTime }}</div>
            <div class="text-xs text-gray-400">{{ currentDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="max-w-6xl mx-auto">
      <!-- 当前开奖区域 -->
      <div class="border border-purple-800/30 rounded-2xl p-8 mb-8 bg-black/50 shadow-xl">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- 左侧：开奖信息 -->
          <div class="lg:w-2/3">
            <div class="text-center mb-6">
              <div class="inline-block px-8 py-3 rounded-2xl text-lg font-bold shadow-xl bg-gradient-to-r from-purple-400 to-pink-500 text-white border border-white/20">
                ⭐ 第 <span class="text-2xl" id="issue-number">{{ currentIssue }}</span> 期
              </div>
              <p class="text-sm mt-3 text-gray-300">开奖日期: {{ drawDate }}</p>
            </div>

            <!-- 开奖显示区域 -->
            <div class="flex flex-wrap justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-gray-900 via-purple-950/30 to-gray-900 shadow-inner" id="static-balls">
              <div v-for="(num, index) in Array.from({ length: drawCount }).map((_, i) => i)"
                   :key="'ball-' + index"
                   class="relative">
                <!-- 滚动数字容器 -->
                <div v-if="isRolling(index)" 
                     class="rolling-ball w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl bg-gradient-to-br from-purple-500 to-purple-800">
                  {{ numbers.length > index ? numbers[index] : getBallText(index) }}
                </div>
                
                <!-- 最终显示号码 -->
                <div v-else-if="numbers.length > index"
                     class="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl bg-gradient-to-br from-purple-500 to-purple-800">
                  {{ numbers[index] }}
                </div>

                <!-- 占位显示 -->
                <div v-else
                     class="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg bg-gray-700 text-gray-400"
                     :class="isDrawing ? 'opacity-50 grayscale' : ''">
                  {{ getBallText(index) }}
                </div>
              </div>
              <div v-if="!isDrawing && numbers.length === 0" class="text-xl py-8 w-full text-center text-gray-300">
                等待开奖...
              </div>
            </div>
          </div>
          
          <!-- 右侧：倒计时 -->
          <div class="lg:w-1/3">
            <!-- 倒计时 -->
            <div class="rounded-2xl p-6 mb-6 shadow-xl border border-purple-800/30 bg-black/50" v-if="scheduleEnabled">
              <p class="text-center mb-4 font-semibold text-purple-400">⏰ 距离下一期开奖</p>
              <div class="flex justify-center gap-2">
                <div class="rounded-xl px-5 py-3 text-center shadow-lg bg-gradient-to-b from-purple-700 to-purple-900 border border-purple-800/30">
                  <span class="text-3xl font-bold text-white font-mono">{{ countdownHours }}</span>
                  <span class="block text-xs mt-1 text-white opacity-80">时</span>
                </div>
                <div class="text-3xl font-bold self-center text-purple-400">:</div>
                <div class="rounded-xl px-5 py-3 text-center shadow-lg bg-gradient-to-b from-purple-700 to-purple-900 border border-purple-800/30">
                  <span class="text-3xl font-bold text-white font-mono">{{ countdownMinutes }}</span>
                  <span class="block text-xs mt-1 text-white opacity-80">分</span>
                </div>
                <div class="text-3xl font-bold self-center text-purple-400">:</div>
                <div class="rounded-xl px-5 py-3 text-center shadow-lg bg-gradient-to-b from-purple-700 to-purple-900 border border-purple-800/30">
                  <span class="text-3xl font-bold text-white font-mono">{{ countdownSeconds }}</span>
                  <span class="block text-xs mt-1 text-white opacity-80">秒</span>
                </div>
              </div>
              
              <!-- 开奖中状态 -->
              <div v-if="isDrawing" class="mt-5 text-center">
                <div class="inline-flex items-center gap-2 text-lg font-bold animate-pulse px-4 py-2 rounded-full bg-red-500/20 text-purple-400">
                  <span class="w-3 h-3 rounded-full animate-bounce bg-purple-400"></span>
                  开奖中...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 历史记录 -->
      <div class="border border-purple-800/30 rounded-2xl p-6 shadow-xl bg-black/50">
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-purple-800/30">
          <h3 class="text-xl font-bold flex items-center gap-2 text-purple-400">
            📋 历史开奖记录
          </h3>
        </div>

        <div class="overflow-x-auto rounded-xl overflow-hidden shadow-inner">
          <table class="w-full">
            <thead class="bg-gradient-to-br from-gray-900 via-purple-950/30 to-gray-900">
              <tr class="border-b border-purple-800/30">
                <th class="text-left py-4 px-4 font-semibold text-purple-400">开奖日期</th>
                <th class="text-left py-4 px-4 font-semibold text-purple-400">期号</th>
                <th class="text-left py-4 px-4 font-semibold text-purple-400">开奖号码</th>
                <th class="text-left py-4 px-4 font-semibold text-purple-400">单双</th>
                <th class="text-left py-4 px-4 font-semibold text-purple-400">和值</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in historyResults" :key="result.id"
                  class="border-b border-white/5 hover:bg-white/5 transition-all">
                <td class="py-3 px-4 text-sm text-gray-300">{{ formatDate(result.created_at) }}</td>
                <td class="py-3 px-4 font-semibold text-purple-400">{{ result.issue_number }}</td>
                <td class="py-3 px-4">
                  <div class="flex gap-1 flex-wrap">
                    <span v-for="num in result.numbers" :key="'h'+num"
                          class="w-7 h-7 rounded-full text-white text-sm font-bold flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-800">
                      {{ num }}
                    </span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span :class="[getSum(result.numbers) % 2 === 0 ? 'text-red-500' : 'text-purple-400']" class="font-semibold">
                    {{ getSum(result.numbers) % 2 === 0 ? '双' : '单' }}
                  </span>
                </td>
                <td class="py-3 px-4 font-bold text-purple-400">{{ getSum(result.numbers) }}</td>
              </tr>
              <tr v-if="historyResults.length === 0">
                <td class="py-6 text-center text-gray-300">暂无记录</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  getSevenStarCurrentApi,
  getSevenStarHistoryApi,
  getScheduleConfigApi
} from '@/api/index'

const currentTime = ref('')
const currentDate = ref('')
const currentIssue = ref('--')
const drawDate = ref('--')
const numbers = ref([])
const historyResults = ref([])
const intervalMs = ref(800)
const scheduleEnabled = ref(false)
const isDrawing = ref(false)
const drawingText = ref('?')
const drawCount = ref(7)
const currentAnimateIndex = ref(-1)
const clientRefreshInterval = ref(3)

// 请求优化相关
let isFetchingCurrent = false // 防止重复请求当前开奖
let isFetchingHistory = false // 防止重复请求历史记录
let lastHistoryRefreshTime = 0 // 上次刷新历史记录的时间
const HISTORY_REFRESH_INTERVAL = 60000 // 历史记录刷新间隔 60 秒
let lastDrawingState = false // 上次开奖状态，用于检测开奖完成

// 滚动动画相关
const rollingBalls = ref([]) // 当前正在滚动的球索引

const countdownHours = ref('00')
const countdownMinutes = ref('00')
const countdownSeconds = ref('00')

let dataRefreshInterval = null
let countdownInterval = null
let timeUpdateInterval = null

function getBallText(index) {
  // 如果已经开奖了这个号码，显示真实号码
  if (numbers.value.length > index) {
    return numbers.value[index]
  }
  
  // 只有在开奖中时才显示占位文字
  if (!isDrawing.value) {
    return '?'
  }
  
  if (!drawingText.value) return '?'
  
  // 尝试解析为逗号分隔的多个字符
  try {
    const chars = drawingText.value.split(',')
    if (chars.length > index) {
      return chars[index].trim() || '?'
    }
  } catch (e) {
    // 忽略，使用单个字符
  }
  
  // 如果是单个字符或不够，返回第一个字符或全部
  if (drawingText.value.length > 0) {
    return drawingText.value[0]
  }
  
  return '?'
}

function isRolling(index) {
  return rollingBalls.value.includes(index)
}

function startBallRolling(index) {
  rollingBalls.value.push(index)
  
  // 滚动动画结束后移除滚动状态
  setTimeout(() => {
    const idx = rollingBalls.value.indexOf(index)
    if (idx > -1) {
      rollingBalls.value.splice(idx, 1)
    }
  }, 1300)
}

function getSum(nums) {
  return nums.reduce((a, b) => a + b, 0)
}

function formatDate(dateStr) {
  if (!dateStr) return '--'
  return new Date(dateStr).toLocaleString('zh-CN')
}

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  currentDate.value = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' })
}

function setupDataRefresh() {
  // 清理旧的定时器
  if (dataRefreshInterval) {
    clearInterval(dataRefreshInterval)
    dataRefreshInterval = null
  }
  
  // 设置当前开奖刷新（高频）
  dataRefreshInterval = setInterval(() => {
    fetchCurrentResult()
  }, clientRefreshInterval.value * 1000)
}

async function fetchCurrentResult() {
  // 防止重复请求
  if (isFetchingCurrent) {
    return
  }
  
  isFetchingCurrent = true
  try {
    const response = await getSevenStarCurrentApi()
    
    if (response.data && response.data.success) {
      const data = response.data
      // 更新配置
      if (data.data.drawing_text !== undefined) {
        drawingText.value = data.data.drawing_text || '?'
      }
      if (data.data.draw_count !== undefined) {
        drawCount.value = data.data.draw_count || 7
      }
      
      const prevDrawingState = isDrawing.value
      isDrawing.value = data.data.is_drawing
      
      // 检测开奖完成：从开奖中变为不开奖
      const drawJustFinished = prevDrawingState && !isDrawing.value
      
      // 有开奖结果（包括开奖过程中的部分结果）
      if (data.data.numbers.length > 0) {
        const newNumbers = data.data.numbers
        currentIssue.value = data.data.issue_number || '--'
        if (data.data.created_at) {
          drawDate.value = new Date(data.data.created_at).toLocaleDateString('zh-CN')
        }
        intervalMs.value = data.data.interval_ms || 800

        // 如果有新的球开奖了（逐球开奖）
        if (newNumbers.length > numbers.value.length) {
          const newBallIndex = newNumbers.length - 1
          numbers.value = [...newNumbers]
          
          // 触发新球的滚动动画
          if (!rollingBalls.value.includes(newBallIndex)) {
            startBallRolling(newBallIndex)
          }
          
          currentAnimateIndex.value = newBallIndex
          setTimeout(() => {
            currentAnimateIndex.value = -1
          }, 500)
          
          // 开奖中：前端插入最新记录到历史列表顶部
          if (isDrawing.value && data.data.issue_number) {
            insertNewResultToHistory(data.data)
          }
        } else if (numbers.value.length === 0 || JSON.stringify(newNumbers) !== JSON.stringify(numbers.value)) {
          // 完全新的一期开奖或第一次加载
          // 如果是新的一期（号码不同），触发逐个展示动画
          if (numbers.value.length > 0 && JSON.stringify(newNumbers) !== JSON.stringify(numbers.value)) {
            // 新的一期，逐个展示号码
            numbers.value = []
            newNumbers.forEach((num, index) => {
              setTimeout(() => {
                numbers.value = [...numbers.value, num]
                if (index < newNumbers.length) {
                  startBallRolling(index)
                }
              }, index * (data.data.interval_ms || 800))
            })
            
            // 新的一期开始，前端插入记录
            if (data.data.issue_number) {
              insertNewResultToHistory(data.data)
            }
          } else {
            // 第一次加载，直接显示所有号码
            numbers.value = [...newNumbers]
          }
          currentAnimateIndex.value = -1
        }
        
        // 开奖完成后刷新一次历史记录（确保数据一致性）
        if (drawJustFinished) {
          setTimeout(() => {
            fetchHistory()
          }, 1000)
        }
      } else if (numbers.value.length > 0 && !data.data.is_drawing) {
        // 没有结果且不在开奖中，但之前有，清空
        numbers.value = []
      } else if (data.data.is_drawing && numbers.value.length > 0) {
        // 进入开奖中状态，清空之前的结果
        numbers.value = []
      }
    }
  } catch (error) {
    console.error('获取当前开奖失败:', error)
  } finally {
    isFetchingCurrent = false
  }
}

function insertNewResultToHistory(drawData) {
  if (!drawData.issue_number) return
  
  const newRecord = {
    id: `temp-${Date.now()}`,
    issue_number: drawData.issue_number,
    numbers: [...drawData.numbers],
    created_at: drawData.created_at || new Date().toISOString(),
    // 计算单双和和值
  }
  
  // 检查是否已存在相同期号的记录
  const existingIndex = historyResults.value.findIndex(
    r => r.issue_number === drawData.issue_number
  )
  
  if (existingIndex >= 0) {
    // 更新已存在的记录
    historyResults.value[existingIndex] = {
      ...historyResults.value[existingIndex],
      numbers: [...drawData.numbers],
      created_at: drawData.created_at || historyResults.value[existingIndex].created_at
    }
  } else {
    // 插入到历史记录顶部
    historyResults.value.unshift(newRecord)
    
    // 保持历史记录数量在合理范围内
    if (historyResults.value.length > 50) {
      historyResults.value = historyResults.value.slice(0, 50)
    }
  }
}

async function fetchHistory() {
  // 防止重复请求
  if (isFetchingHistory) {
    return
  }
  
  isFetchingHistory = true
  try {
    const response = await getSevenStarHistoryApi()
    if (response.data) {
      historyResults.value = response.data
    }
    lastHistoryRefreshTime = Date.now()
  } catch (error) {
    console.error('获取历史记录失败:', error)
  } finally {
    isFetchingHistory = false
  }
}

async function fetchSchedule() {
  try {
    const response = await getScheduleConfigApi()
    if (response.data && response.data.success) {
      const data = response.data
      scheduleEnabled.value = data.data.enabled
      
      if (data.data.enabled && data.data.next_draw_time) {
        // 只要有 next_draw_time，就重新开始倒计时
        console.log('获取到新的开奖时间:', data.data.next_draw_time)
        startCountdown(data.data.next_draw_time)
      } else {
        console.log('没有找到新的开奖时间或定时开奖未启用')
        // 清理倒计时
        if (countdownInterval) {
          clearInterval(countdownInterval)
          countdownInterval = null
        }
      }
    }
  } catch (error) {
    console.error('获取配置失败:', error)
  }
}

function startCountdown(nextDrawTime) {
  // 清理所有旧的定时器
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  
  let isRefreshing = false

  function updateCountdown() {
    // 如果在开奖中，显示开奖中
    if (isDrawing.value) {
      countdownHours.value = '开'
      countdownMinutes.value = '奖'
      countdownSeconds.value = '中'
      return
    }

    if (isRefreshing) return

    const now = new Date()
    const next = new Date(nextDrawTime)
    const diff = next - now

    if (diff <= 0) {
      if (!isRefreshing) {
        isRefreshing = true
        
        // 倒计时到0，触发一次当前开奖检查
        fetchCurrentResult()
        
        // 检查开奖状态，开奖完成后立即重新获取配置并开始下一期
        const checkInterval = setInterval(() => {
          if (!isDrawing.value) {
            clearInterval(checkInterval)
            // 开奖完成，立即刷新配置，开始下一期倒计时
            fetchSchedule()
            isRefreshing = false
          }
        }, 1000)
        
        // 设置超时保护，15秒后强制刷新
        setTimeout(() => {
          if (isRefreshing) {
            clearInterval(checkInterval)
            fetchSchedule()
            isRefreshing = false
          }
        }, 15000)
      }
      return
    }

    if (diff > 24 * 60 * 60 * 1000) {
      countdownHours.value = '--'
      countdownMinutes.value = '--'
      countdownSeconds.value = '--'
      return
    }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    countdownHours.value = String(hours).padStart(2, '0')
    countdownMinutes.value = String(minutes).padStart(2, '0')
    countdownSeconds.value = String(seconds).padStart(2, '0')
  }

  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
}

onMounted(() => {
  updateTime()
  fetchCurrentResult()
  fetchHistory()
  fetchSchedule()

  timeUpdateInterval = setInterval(updateTime, 1000)

  // 设置数据刷新
  setupDataRefresh()
  
  // 设置历史记录刷新（低频，开奖过程中不刷新）
  setInterval(() => {
    const now = Date.now()
    // 开奖过程中不刷新历史记录
    if (!isDrawing.value && now - lastHistoryRefreshTime >= HISTORY_REFRESH_INTERVAL) {
      fetchHistory()
      lastHistoryRefreshTime = now
    }
  }, 10000)
})

onUnmounted(() => {
  // 清理所有定时器
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval)
    timeUpdateInterval = null
  }
  if (dataRefreshInterval) {
    clearInterval(dataRefreshInterval)
    dataRefreshInterval = null
  }
})
</script>

<style scoped>
.rolling-ball {
  animation: ballRoll 1.3s ease-out forwards;
}

@keyframes ballRoll {
  0% {
    transform: translateY(80px) translateX(-30px) rotate(-180deg) scale(0.5);
    opacity: 0;
  }
  25% {
    transform: translateY(40px) translateX(20px) rotate(-90deg) scale(0.8);
    opacity: 1;
  }
  50% {
    transform: translateY(10px) translateX(-15px) rotate(0deg) scale(1.1);
    opacity: 1;
  }
  75% {
    transform: translateY(5px) translateX(10px) rotate(45deg) scale(1.05);
    opacity: 1;
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(1);
    opacity: 1;
  }
}
</style>
