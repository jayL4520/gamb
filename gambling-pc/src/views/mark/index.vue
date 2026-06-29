
<template>
  <div class="w-full">
    <!-- <div class="iframeBox" style="height: 337.5px;width: 600px;">
    <iframe src="https://wpfilesamws.lhjyw.vip/video/index.html?p=0&cdn=1" width="600" height="337.5" allow="autoplay fullscreen" allowfullscreen="" style="border: 0px; width: 100%; height: 100%;"></iframe>
    </div> -->
    <div
      class="bg-white flex rounded-[1rem] my-[1rem] items-center py-[1.5rem]"
      :class="isSevenStar ? 'h-auto' : 'h-[11rem]'"
    >

      <div class="px-[1.5rem] w-[50%] h-full">
        <div class="flex items-end">
          <div class="text-black font-bold text-[1.2rem]/[2rem] mr-[10px]">
            {{ codeToLottery(winresultsinfo.lotteryType) }}
          </div>
          <div class="text-[0.8rem]/[1.6rem] text-[#666]">
            第<span class="text-[red] px-[5px]"
              >{{ winresultsinfo.period }}</span
            >期开奖<span class="text-[#999999] ml-[3px]"
              >({{ formatTimestamp1(winresultsinfo.date) }})</span
            >
          </div>
        </div>

        <!-- 七星彩专用显示 -->
        <div v-if="isSevenStar" class="mt-[1rem]">
          <!-- 开盘状态提示 -->
          <div class="mb-2 flex items-center gap-2">
            <span v-if="sevenStarIsTradingOpen && sevenStarIsWithinTradingHours" 
                  class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              ✅ 开盘中
            </span>
            <span v-else-if="!sevenStarIsTradingOpen" 
                  class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
              ❌ 已关盘
            </span>
            <span v-else 
                  class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
              ⏰ 休市中 ({{ sevenStarTradingStartTime }}-{{ sevenStarTradingEndTime }})
            </span>
            <span class="text-xs text-gray-500">
              开盘时间: {{ sevenStarTradingStartTime }} ~ {{ sevenStarTradingEndTime }}
            </span>
          </div>
          <!-- 调试信息 -->
          <div v-if="true" style="display:none">
            <div>isSevenStar: {{ isSevenStar }}</div>
            <div>sevenStarDrawCount: {{ sevenStarDrawCount }}</div>
            <div>sevenStarNumbers: {{ sevenStarNumbers }}</div>
            <div>categoryId: {{ categoryId }}</div>
          </div>
          <!-- 7个开奖号码 - 使用新的状态逻辑 -->
          <div>
            <div class="flex flex-wrap items-center gap-3">
              <div v-for="(num, index) in 7"
                   :key="'star-' + index"
                   class="relative flex  items-center"
                   :class="{
                  'flex-col':index!==6 }"
              >
                
                  <div class="mr-[10px]" v-if="index==6">+</div>
              
                <div class="box">
                 
                  <!-- 滚动数字容器 -->
                  <div v-if="isSevenStarRolling(index)" 
                       class="text-[1.1rem] w-[2rem] h-[2rem] rounded-full flex items-center justify-center shadow-xl"
                       :class="sevenStarNumbers.length > index ? ['rolling-ball', 'text-white', getSevenStarColor(sevenStarNumbers[index])] : (sevenStarIsDrawing ? 'bg-gray-700 text-gray-400' : 'bg-gray-600')"
                       :style="sevenStarNumbers.length <= index ? { opacity: sevenStarIsDrawing ? '0.5' : '1', filter: sevenStarIsDrawing ? 'grayscale(100%)' : 'none' } : {}"
                  >
                    {{ sevenStarNumbers.length > index ? String(sevenStarNumbers[index]).padStart(2, '0') : getSevenStarBallText(index) }}
                  </div>
                  
                  <!-- 最终显示号码 -->
                  <div v-else-if="sevenStarNumbers.length > index"
                       class="text-white text-[1.1rem] w-[2rem] h-[2rem] rounded-full flex items-center justify-center shadow-xl"
                       :class="getSevenStarColor(sevenStarNumbers[index])"
                  >
                    {{ String(sevenStarNumbers[index]).padStart(2, '0') }}
                  </div>

                  <!-- 占位显示 -->
                  <div v-else
                       class="text-[1.1rem] w-[2rem] h-[2rem] rounded-full flex items-center justify-center shadow-xl"
                       :class="sevenStarIsDrawing ? 'bg-gray-700 text-gray-400' : 'bg-gray-600'"
                       :style="{ opacity: sevenStarIsDrawing ? '0.5' : '1', filter: sevenStarIsDrawing ? 'grayscale(100%)' : 'none' }"
                  >
                    {{ getSevenStarBallText(index) }}
                  </div>
                  
                  <div class="text-[gray] text-[0.8rem] mt-[0.3rem] text-center" v-if="sevenStarNumbers.length > index">
                    {{ getSevenStarZodiac(sevenStarNumbers[index]) }}
                  </div>
               
                </div>
              </div>
            </div>
            <!-- <div v-if="!sevenStarIsDrawing && sevenStarNumbers.length === 0" class="text-xl py-2 w-full text-center text-gray-300">
              等待开奖...
            </div> -->
          </div>
        </div>

        <!-- 普通六合彩显示 -->
        <ul v-if="!isSevenStar && winresultsinfo.ball.length > 0 && (+winresultsinfo.status !== 0 || isDrawingNotStarted || isDrawingInProgress)" class="flex mt-[1rem]">

          <transition-group name="fade" class="flex items-center"   tag="div">
            <li
              class="flex flex-col items-center mr-[1.2rem]"
              v-for="(item, index) in 7"
              :key="index"
              :class="{ 'animated-ball': winresultsinfo.ball[index]?.animated }"
            >
            <div class="flex flex-col items-center justify-center" :class="{
              'flex-row': index == 6
            }"><span v-if="index==6" class="text-[2rem] mr-[1.2rem]">+</span>
             <div class="flex flex-col" >
              <div
                class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
                :class="getBallClass(index)"
              >
                {{ getBallDisplay(index) }}
              </div>

              <div class="text-[gray] text-[1rem] mt-[0.5rem] text-center" v-if="showZodiac(index)">
                {{getZodiacsObj(winresultsinfo.date*1000)[+winresultsinfo.ball[index]?.num] ||'-' }}
              </div>
               </div>
              </div>
            </li>
          </transition-group>

          <!-- <li class="text-[2rem]"></li>
          <li class="flex flex-col items-center justify-center ml-[0.8rem]">
            <div
              class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
              :class="getLastBallClass()"
            >
              {{ getLastBallDisplay() }}
            </div>
            <div class="text-[gray] text-[1rem] mt-[0.5rem]" v-if="showLastBallZodiac()">
              {{getZodiacsObj(winresultsinfo.date*1000)[+winresultsinfo.lastBall?.num] ||'-' }}
            </div>
          </li> -->
        </ul>
      </div>
      <div class="w-[1px] h-[5rem] bg-slate-200"></div>

      <div class="w-[50%] px-[1.5rem] h-full flex justify-between items-center ">
     
        <div v-if="isSevenStar ? sevenStarIsDrawing: isOpen('_openTime')&&(+winresultsinfo.status==1||isOpenBotKai)" 
              class="w-[8.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mx-[5px] margR20"
            >

              {{!isSevenStar?'开奖中...':isDrawStatus?'开奖中...':'准备下一期'}}
            </div>
            <div v-else >
          <div class="text-[0.8rem]/[1.6rem] text-[#666]">
            距<span class="text-[red] px-[5px]"
              >{{ !isSevenStar?nextwinresultst.year:'' }}{{ nextwinresultst.period }}</span
            >期开奖<span class="text-[#999999] ml-[3px]"
              >({{ formatTimestamp(nextwinresultst.date) }})</span
            >
          </div>
          <div class="flex items-center text-[#666] mt-[10px]">
            <div
              class="w-[2.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mr-[5px]"
            >
              {{ isSevenStar ? sevenStarCountdownHours : (countdownTime[0] || "00") }}
            </div>
            时
            <div
              class="w-[2.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mx-[5px]"
            >
            
              {{ isSevenStar ? sevenStarCountdownMinutes : (countdownTime[1] || "00") }}
            </div>
            分
            <div
              class="w-[2.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mx-[5px]"
            >
              {{ isSevenStar ? sevenStarCountdownSeconds : (countdownTime[2] || "00") }}
            </div>
            秒
          </div>
        </div>
        <div class="line margt20" id="startVideo" style="position:relative;cursor:pointer;"  @click.prevent="playback({...nextwinresultst,liveUrl,})">

				<img :src="logo" width="185" height="122">
				<img src="@/assets/d01.png" style="height:63px;width:63px;border-radius:50%;position:absolute;top:40px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);" width="185" height="122" />
			</div>
      </div>
    </div>

    <!-- 开奖记录 -->
    <div class="bg-white max-w-[1250px] mx-auto mb-[2rem]">
      <div class="flex justify-between items-center px-[1rem] py-[0.8rem]">
        <span class="font-bold text-[1.1rem]">开奖记录</span>
        <div class="flex items-center text-[1rem] text-[#555]">
          <span class="">日期：</span>

          <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择年份"
            :disabled-date="disabledDate"
            :editable="false"
            :clearable="false"
            @change="onYearChange"
          />
        </div>
      </div>
      <div class="pb-[10px]">
      
        <el-table
          :data="resultslist"
          style="width: 100%"
          v-loading="tableLoading"
          stripe
      
          
          border
          class="text-[1rem]"
          ref="tableRef"
        >
          <el-table-column label="时间" align="center" width="160">
            <template #default="scope">
              <div class="text-center">
                {{ formatTimestamp(scope.row.date) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="期数" align="center" width="90">
            <template #default="scope">
              <div class="text-center">
                
               
                <span v-if="scope.row.lotteryType === 'QXC' && scope.row.status === 1&&isDrawStatus" class="text-[red]">开奖中</span>
                <span v-else>{{ scope.row.period }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="号码" align="center" width="280">
            <template #default="scope">
              <!-- 七星彩历史记录显示 -->
              <div v-if="scope.row.lotteryType === 'QXC'">
                <div v-if="scope.row.seven_star_numbers && scope.row.seven_star_numbers.length > 0">
                  <ul class="flex text-[1rem] justify-center">
                    <li
                      class="flex flex-col items-center mr-[3px]"
                      v-for="(num, index) in scope.row.seven_star_numbers.slice(0, 6)"
                      :key="index"
                    >
                      <div
                        class="text-white w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full"
                        :class="getSevenStarColor(num)"
                      >
                        {{ String(num).padStart(2, '0') }}
                      </div>
                      <div class="text-[gray] text-xs mt-[2px]">
                        {{ getSevenStarZodiac(num) }}
                      </div>
                    </li>
                    <li class="text-[1.5em]" >+</li>
                    <li class="flex flex-col items-center ml-[0.3rem]" v-if="scope.row.seven_star_numbers[6]">
                      <div
                        class="text-white w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full"
                        :class="getSevenStarColor(scope.row.seven_star_numbers[6])"
                      >
                        {{ String(scope.row.seven_star_numbers[6]).padStart(2, '0') }}
                      </div>
                      <div class="text-[gray] text-xs mt-[2px]">
                        {{ getSevenStarZodiac(scope.row.seven_star_numbers[6]) }}
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <ul class="flex text-[1rem] justify-center">
                    <li
                      class="flex flex-col items-center mr-[3px]"
                      v-for="(item, index) in scope.row.ball"
                      :key="index"
                    >
                      <div
                        class="text-white w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full"
                        :class="getSevenStarColor(item.num)"
                      >
                        {{ item.num }}
                      </div>
                      <div class="text-[gray] text-xs mt-[2px]">
                        {{ getSevenStarZodiac(item.num) }}
                      </div>
                    </li>
                    <li class="text-[1.5em]">+</li>
                    <li class="flex flex-col items-center ml-[0.3rem]" v-if="scope.row.lastBall">
                      <div
                        class="text-white w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full"
                        :class="getSevenStarColor(scope.row.lastBall.num)"
                      >
                        {{ scope.row.lastBall.num }}
                      </div>
                      <div class="text-[gray] text-xs mt-[2px]">
                        {{ getSevenStarZodiac(scope.row.lastBall.num) }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 普通六合彩历史记录显示 -->
              <ul v-else class="flex text-[1rem] justify-center">
                <li
                  class="flex flex-col items-center mr-[3px]"
                  v-for="(item, index) in scope.row.ball"
                  :key="index"
                >
                  <div
                    class="text-white w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full"
                    :class="`${
                      item.sb == 'red'
                        ? 'bg-rose-600'
                        : item.sb == 'blue'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`"
                  >
                    {{ item.num }}
                  </div>
                  <div class="text-[gray] mt-[2px]">
                    {{ getZodiacsObj(scope.row.date*1000)[+item.num] || '-'  }}
                  </div>
                </li>
                <li class="text-[1.5em]" v-show="scope.row.ball.length==6">+</li>
                <li class="flex flex-col items-center ml-[0.3rem]" v-show="scope.row.ball.length==6">
                  <div
                    class="text-white w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full"
                    :class="`${
                      scope.row.lastBall?.sb == 'red'
                        ? 'bg-rose-600'
                        : scope.row.lastBall?.sb == 'blue'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`"
                  >
                    {{ scope.row.lastBall?.num }}
                  </div>
                  <div class="text-[gray] mt-[2px]">
                
                    {{ getZodiacsObj(scope.row.date*1000)[+scope.row.lastBall?.num] || '-' }}
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
          
            <el-table-column label="生肖量" align="center" width="60">
              <template #default="scope">
                <div class="text-center">
                  <template v-if="scope.row.lotteryType === 'QXC'">
                    <template v-if="scope.row.seven_star_numbers">
                      {{ getSevenStarSxLiang(scope.row.seven_star_numbers) }}
                    </template>
                    <template v-else-if="scope.row.sxLiang">
                      {{ scope.row.sxLiang }}
                    </template>
                    <template v-else>
                      -
                    </template>
                  </template>
                  <template v-else>
                    {{ sxliang([...scope.row.ball.map(e=>e.num), scope.row.lastBall?.num], getZodiacsObj(scope.row.date*1000)) }}
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="尾数量" align="center" width="60">
              <template #default="scope">
                <div class="text-center">
                  <template v-if="scope.row.lotteryType === 'QXC'">
                    <template v-if="scope.row.seven_star_numbers">
                      {{ getSevenStarWeiShuLiang(scope.row.seven_star_numbers) }}
                    </template>
                    <template v-else-if="scope.row.weiShuLiang">
                      {{ scope.row.weiShuLiang }}
                    </template>
                    <template v-else>
                      -
                    </template>
                  </template>
                  <template v-else>
                    {{ weishuliang([...scope.row.ball.map(e=>e.num), scope.row.lastBall?.num]) }}
                  </template>
                </div>
              </template>
            </el-table-column>
        <el-table-column label="特码" align="center" >
     
      
              <!-- {{ getSpecial(scope.row.lastBall?.num) }} -->
         
           
             <el-table-column label="单双" align="center" width="60">
              <template #default="scope">
                <div class="text-center">
                  <template v-if="scope.row.lotteryType === 'QXC'">
                    <template v-if="scope.row.seven_star_numbers && scope.row.seven_star_numbers[6]">
                      {{ oddEven(scope.row.seven_star_numbers[6]) }}
                    </template>
                    <template v-else>
                      {{ scope.row.lastBall?.num == 49 ? '和' : oddEven(scope.row.lastBall?.num) }}
                    </template>
                  </template>
                  <template v-else>
                    {{ scope.row.lastBall?.num == 49 ? '和' : oddEven(scope.row.lastBall?.num) }}
                  </template>
                </div>
              </template>
            </el-table-column>
          
            <el-table-column label="大小" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
                  <template v-if="scope.row.lotteryType === 'QXC'">
                    <template v-if="scope.row.seven_star_numbers && scope.row.seven_star_numbers[6]">
                      {{ isBig(scope.row.seven_star_numbers[6], 25) }}
                    </template>
                    <template v-else>
                      {{ scope.row.lastBall?.num == 49 ? '和' : isBig(scope.row.lastBall?.num) }}
                    </template>
                  </template>
                  <template v-else>
                    {{ scope.row.lastBall?.num == 49 ? '和' : isBig(scope.row.lastBall?.num) }}
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="合单双" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
                  <template v-if="scope.row.lotteryType === 'QXC'">
                    <template v-if="scope.row.seven_star_numbers && scope.row.seven_star_numbers[6]">
                      {{ '合' + oddEven(weishuSum(scope.row.seven_star_numbers[6])) }}
                    </template>
                    <template v-else-if="scope.row.lastBall">
                      {{ '合' + oddEven(weishuSum(scope.row.lastBall.num)) }}
                    </template>
                    <template v-else>
                      -
                    </template>
                  </template>
                  <template v-else>
                    {{ scope.row.lastBall?.num == 49 ? '和' : '合' + oddEven(weishuSum(scope.row.lastBall?.num)) }}
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="合大小" align="center" width="70">
              <template #default="scope">
                <div class="text-center"> 
                  <template v-if="scope.row.lotteryType === 'QXC'">
                    <template v-if="scope.row.seven_star_numbers && scope.row.seven_star_numbers[6]">
                      {{ '合' + isBig(weishuSum(scope.row.seven_star_numbers[6]), 7) }}
                    </template>
                    <template v-else-if="scope.row.lastBall">
                      {{ '合' + isBig(weishuSum(scope.row.lastBall.num), 7) }}
                    </template>
                    <template v-else>
                      -
                    </template>
                  </template>
                  <template v-else>
                    {{ scope.row.lastBall?.num == 49 ? '和' : '合' + isBig(weishuSum(scope.row.lastBall?.num), 7) }}
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="尾大小" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
                  <template v-if="scope.row.lotteryType === 'QXC'">
                    <template v-if="scope.row.seven_star_numbers && scope.row.seven_star_numbers[6]">
                      {{ '尾' + weiSize(scope.row.seven_star_numbers[6]) }}
                    </template>
                    <template v-else-if="scope.row.lastBall">
                      {{ '尾' + weiSize(scope.row.lastBall.num) }}
                    </template>
                    <template v-else>
                      -
                    </template>
                  </template>
                  <template v-else>
                    {{'尾' + (scope.row.lastBall?.num == 49 ? '和' : weiSize(scope.row.lastBall?.num))}}
                  </template>
                </div>
              </template>
            </el-table-column> 
           
          </el-table-column>

          <el-table-column label="总和" align="center">
            <el-table-column label="总分" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.total }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="大小" align="center" width="65">
              <template #default="scope">
                <div class="text-center">
                  <template v-if="scope.row.lotteryType === 'QXC'">
                    {{ scope.row.total >= 175 ? '大' : '小' }}
                  </template>
                  <template v-else>
                    {{ scope.row.total >= 175 ? '大' : '小' }}
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="单双" align="center" width="55">
              <template #default="scope">
                <div class="text-center">
                  {{ oddEven(scope.row.total) }}
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
        
            label="视频"
            align="center"
            width="65"
          >
            <template #default="scope">
              <el-button
                v-if="
                  scope.row.videoUrl &&
                  scope.row.videoUrl != '' &&
                  categoryId != 'HK'
                "
                type="primary"
                size="small"
                style="width: 45px;padding: 5px 2px;"
                @click.prevent="playback(scope.row)"
              >
                回放
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-end my-[10px] px-[10px]">
          <el-pagination
            :page-size="pageSize"
            :current-page="pageNum"
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="playbackinfo.dialogVisibleTitle"
      max-width="896px"
    >

      <div class="w-full h-auto shadow-lg min-h-[565px]">
        <!-- controlsList="nodownload nofullscreen noremoteplayback disablePictureInPicture" 隐藏全屏... -->
        <video
          :src="playbackinfo.videoUrl"
          class="w-full h-auto shadow-lg min-h-[565px]"
          controls
          autoplay
          preload="metadata"
          v-if="!playbackinfo.liveUrl"
        
        >
          您的浏览器不支持视频播放。
        </video>
        <!-- <iframe data-v-98da589e="" width="746.6666666666666" height="420" src="/player/index.html?url=https://play8398.lianwin88.com/live/mosixmark.flv" frameborder="0" allow="autoplay" scrolling="no"></iframe> -->
          <iframe class="w-full h-auto shadow-lg  min-h-[565px]" v-else-if="showLive" :src="playbackinfo.liveUrl" style="height:100%;width:100%;border:none;" scrolling="no"></iframe>
        <!-- <iframe v-else style="height:100%;width:100%;border:none;" scrolling="no" src="https://135ka.com/index.php/index/lhc_video.html?t=xal"></iframe> -->
        <div v-else style="width:100%;height:565px;background-color:black;position:relative;" id="live_div">
			<div style="position:absolute;top:40%;width:100%;height:45px;line-height:45px;color:white;text-align:center;font-size:18px;" id="live_tip">
				<span class="unicode_key"> {{codeToLottery(winresultsinfo.lotteryType)}}</span><input type="hidden" :value="codeToLottery(winresultsinfo.lotteryType)"><span class="unicode_key">搅珠</span><input type="hidden" value="搅珠">直播时间为<span class="unicode_key">开奖</span><input type="hidden" value="开奖">日 <span style="color:red;">{{indMenu.openTime}}</span> (<span class="unicode_key">北京</span><input type="hidden" value="北京">时间)
			</div>
		</div>
      
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getNewDataApi, getNewDataApiG,datalistApi, getSevenStarCurrentApi, getSevenStarHistoryApi, getScheduleConfigApi } from "@/api/index";
import {
  codeToLottery,
  formatTimestamp,
  formatTimestamp1,
  oddEven,
  isBig,
  weishuSum,
  sxliang,
  weishuliang,
  getZodiacsObj,
  ColorDict,
  getSpecial,
  getSevenStarZodiac,
  transformSevenStarData,
  getSevenStarColor,
  getSevenStarSxLiang,
  getSevenStarWeiShuLiang
} from "@/utils/utils";

import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import  settingMer  from "@/utils/settingMer";
import { weiSize } from "../../utils/utils";
const route = useRoute();
const hasPeriod = ref(false)
const categoryId = ref(route.params.id);
const year = ref(new Date(new Date().getFullYear(), 0));
const nowyear = ref(new Date(new Date().getFullYear(), 0));
const nextwinresultst = ref({});
const winresultsinfo = ref({ ball: [] });
const hasNewRes = ref(false)
const loading = ref(false);
const tableLoading = ref(false);
console.log("sdddd",settingMer)
const liveUrl = computed(()=>
// http://202.146.223.40:8123
// ${indMenu.value?.liveUrl2}
`${indMenu.value?.liveUrl2}?url=${indMenu.value?.liveUrl}`
)
const segmentedProps = {
  label: "name",
  value: "code",
};

const timer = ref(null);
const countdownTime = ref([]);
const pageNum = ref(1);
const pageSize = ref(20);
const total = ref(0);
const resultslist = ref([]);
const tableRef = ref();
const dialogVisible = ref(false);
const playbackinfo = ref({});
const lastBall = ref('');
const isOpenBotKai = ref(false)
let isRef = ref(false)
let isRefList = ref(false)
const config = ref({})
// 后台配置
const scheduleConfig = ref({
  liveStreamUrl: '',
  redirectUrl: '',
  nextDrawTime: null,
  intervalSeconds: 30
})
const indMenu = computed(() => {
  return settingMer.menuList.find((e) => e.code === categoryId.value) || {};
});

// 判断是否是七星彩
const isSevenStar = computed(() => {
  return categoryId.value === 'QXC';
});

// 七星彩专用的开奖状态 - 完全按照client项目的逻辑
const sevenStarNumbers = ref([])
const sevenStarIsDrawing = ref(false)
const sevenStarDrawingText = ref('?')
const sevenStarDrawCount = ref(7)
const sevenStarIssue = ref('--')
const sevenStarDrawDate = ref('--')
const sevenStarScheduleEnabled = ref(false)
const sevenStarIntervalMs = ref(800)
const sevenStarCountdownHours = ref('00')
const sevenStarCountdownMinutes = ref('00')
const sevenStarCountdownSeconds = ref('00')
const hasPushNewResult = ref(false) // 是否已经推送过新结果到前端，防止重复推送
// 滚动动画相关
const sevenStarRollingBalls = ref([]) // 当前正在滚动的球索引
const sevenStarIsFetching = false // 防止重复请求
// 开盘状态
const sevenStarIsTradingOpen = ref(true)
const sevenStarTradingStartTime = ref('09:00')
const sevenStarTradingEndTime = ref('23:59')
const sevenStarIsWithinTradingHours = ref(true)

// 倒计时相关
let sevenStarCountdownInterval = null
// ★★★ 新增：跟踪本地添加的开奖期号，防止开奖中历史接口刷新覆盖本地数据 ★★★
const drawingRefreshTimer = ref(null) // 开奖完成后刷新历史的定时器
const isInDrawingWindow = computed(() => {
  return isOpen('_openTime');
});

const isDrawingNotStarted = computed(() => {
  let ist = isOpen('_openTime')
  if (!isOpen('_openTime')||(ist&&isOpen('_openTime')&&winresultsinfo.value.status == 1&&winresultsinfo.value.ball?.length > 0)){
    console.log("sd=开奖了",ist)
        ist = false;
  } 
  if(!ist&&+winresultsinfo.value.status === 2){
 console.log("sd=winresultsinfo",ist)
    ist = false
  } 
  return ist;
});

const isDrawingInProgress = computed(() => {
  return (winresultsinfo.value.status !== 1 && isDrawingNotStarted.value )|| (isOpen('_openTime') && +winresultsinfo.value.status === 1 && winresultsinfo.value.ball?.length < 7);
});

const isDrawingComplete = computed(() => {
  return isOpen('_openTime') && +winresultsinfo.value.status === 2;
});

const showBallPlaceholder = (index) => {
    console.log("sd=showBallPlaceholder",index,isDrawingInProgress.value,isOpenBotKai.value)
  if (isOpenBotKai.value) return true;
  if (!isOpenBotKai.value) {
    const ball = winresultsinfo.value.ball?.[index];
    return !ball?.num&& isOpen('_openTime');
  }

  return false;
};

const showLastBallPlaceholder = () => {
  if (isOpenBotKai.value) return true;
  if (!isOpenBotKai.value) {
    return !winresultsinfo.value.lastBall?.num;
  }
  return false;
};

const shouldClearBalls = computed(() => {
  return isOpen('_openTime') && +winresultsinfo.value.status !== 1;
});

// 七星彩相关函数
function getSevenStarBallText(index) {
  // 如果已经开奖了这个号码，显示真实号码
  if (sevenStarNumbers.value.length > index) {
    return String(sevenStarNumbers.value[index]).padStart(2, '0')
  }
  
  // 七星彩模式下只显示简单的问号占位符，不显示复杂文字
  return   sevenStarDrawingText.value?.split(',')[index] || '?'
}

function isSevenStarRolling(index) {
  // 只有在开奖中时才可能有滚动动画
  return sevenStarIsDrawing.value && sevenStarRollingBalls.value.includes(index)
}

function startSevenStarBallRolling(index) {
  sevenStarRollingBalls.value.push(index)
  
  // 滚动动画结束后移除滚动状态
  setTimeout(() => {
    const idx = sevenStarRollingBalls.value.indexOf(index)
    if (idx > -1) {
      sevenStarRollingBalls.value.splice(idx, 1)
    }
  }, 1300)
}

const getBallDisplay = (index) => {
  console.log("sd=getBallDisplay", index, showBallPlaceholder(index), winresultsinfo.value.ball);
  
  // 如果是七星彩，使用新逻辑
  if (isSevenStar.value) {
    return getSevenStarBallText(index)
  }
  
  // 原有的逻辑
  const placeholder = '正准备在开奖中'.split('')[index] || '中';
  if (isOpenBotKai.value) {
    return placeholder;
  }
  return winresultsinfo.value.ball?.[index]?.num || placeholder;
};



const getBallClass = (index) => {
  console.log("sd=getBallClass",index,showBallPlaceholder(index),winresultsinfo.value.ball)
  if (showBallPlaceholder(index)) {
    return 'bg-gray-400';
  }
  const ball = winresultsinfo.value.ball?.[index];
  if (!ball?.sb) return 'bg-gray-400';
  return ball.sb === 'red' ? 'bg-rose-600' : ball.sb === 'blue' ? 'bg-blue-500' : 'bg-green-500';
};



const showZodiac = (index) => {
  return !showBallPlaceholder(index) && winresultsinfo.value.ball?.[index]?.num;
};


const hasNewIndex = ref(-1); // 记录最新号码的索引
const getColors = (n) => {
  let str = 'red'
  // console.log("sfff=11", n,ColorDict)
  for(let i in ColorDict){
    let ars = ColorDict[i].map(e=>+e)
    // console.log("sfsff=",i,ars,String(n),(ars).includes(+n))
    if((ars).includes(+n)){
      str = i

    }
   
  }
  return str
};
const resFn = (x) => {
  if(x.numbers){
    let numberarr = x.numbers?.split(",");
        let sbarr = x.sb.split(",");
        let sxarr = x.sx.split(",");
        let ball = [];
        hasNewIndex.value = numberarr.length-1;

        numberarr.forEach((j, i) => {
          ball.push({
            num: j,
            sb: sbarr[i],
            sx: sxarr[i],
          });
        });
        console.log("sdddd==", hasNewIndex.value,  winresultsinfo.value)
            x.ball = ball;
            // if(isOpenBotKai.value&&+x.status==1){
            //   isOpenBotKai.value =  false;
            // }
        if(isOpen()&&!hasPeriod.value&&((winresultsinfo.value.period&&winresultsinfo.value.period!==x.period))){
          hasPeriod.value = true
        }
        // if(isOpen()&&ball.length==7&&+winresultsinfo.value.status!==1&&isOpenBotKai.value){
        //       //  x.ball = []
        // }
        
         
  }
  winresultsinfo.value = x;
  
};
const getNewData = async (s) => {
  let lotCode = categoryId.value.toLowerCase()
  loading.value = true;
  isRef.value = s;
  // 重置刷新标志
  isRefList.value = false;
  
  // 如果是七星彩，调用Flask后端API
  if (isSevenStar.value) {
    try {
      const res = await getSevenStarCurrentApi();
      loading.value = false;
      
      if (res.data && res.data.success) {
        const data = res.data.data;
        config.value = data
        // 首先检查是否有 seven_star_numbers，这是七星彩的正确字段
        let useNumbers = [];
        if (data.seven_star_numbers && data.seven_star_numbers.length > 0) {
          useNumbers = data.seven_star_numbers;
        }
        //  else if (data.numbers && data.numbers.length > 0) {
        //   useNumbers = data.numbers;
        // }
        
        console.log('七星彩接口返回:', {
          seven_star_numbers: data.seven_star_numbers,
          numbers: data.numbers,
          useNumbers: useNumbers,
          currentNumbers: sevenStarNumbers.value,
          is_drawing: data.is_drawing
        });
        
        // 更新配置
        if (data.drawing_text !== undefined) {
          sevenStarDrawingText.value = data.drawing_text || '?'
        }
        if (data.draw_count !== undefined) {
          sevenStarDrawCount.value = data.draw_count || 7
        } else {
          sevenStarDrawCount.value = 7 // 确保七星彩固定显示7个球
        }
        
        // 更新开盘状态
        if (data.is_trading_open !== undefined) {
          sevenStarIsTradingOpen.value = data.is_trading_open
        }
        if (data.trading_start_time) {
          sevenStarTradingStartTime.value = data.trading_start_time
        }
        if (data.trading_end_time) {
          sevenStarTradingEndTime.value = data.trading_end_time
        }
        if (data.is_within_trading_hours !== undefined) {
          sevenStarIsWithinTradingHours.value = data.is_within_trading_hours
        }
        
        // 保存之前的开奖状态，用于检测开奖完成
        const wasDrawing = sevenStarIsDrawing.value;
        
        // 更新开奖中状态
        console.log("sdf",data.all_20_numbers)
        sevenStarIsDrawing.value = data.is_drawing&&data.numbers.length<20

        // ★★★ 关键修复：统一清理历史记录中过期的"开奖中"状态 ★★★
        // 确保任何时刻列表中最多只有一条七星彩记录显示"开奖中"
        if (resultslist.value && resultslist.value.length > 0) {
          const currentPeriod = data.issue_number || '';
          resultslist.value.forEach((item, idx) => {
            if (item.lotteryType === 'QXC' && item.status === 1) {
              // 如果正在开奖：只保留当前期号的状态为1，其他全部设为2
              // 如果没有在开奖：全部设为2
              if (!data.is_drawing || item.period !== currentPeriod) {
                const updated = { ...item, status: 2, isDrawing: false };
                resultslist.value[idx] = updated;
              }
            }
          });
        }

        // 有开奖结果（包括开奖过程中的部分结果）
        if (useNumbers.length > 0) {
          const newNumbers = useNumbers
          sevenStarIssue.value = data.issue_number || '--'
          if (data.created_at) {
            sevenStarDrawDate.value = new Date(data.created_at).toLocaleDateString('zh-CN')
          }
          sevenStarIntervalMs.value = data.interval_ms || 800

          // 如果有新的球开奖了（逐球开奖）
          if (newNumbers.length > sevenStarNumbers.value.length) {
            const newBallIndex = newNumbers.length - 1
            console.log('逐球开奖：新球索引', newBallIndex, '新号码', newNumbers, '当前号码', sevenStarNumbers.value)
            sevenStarNumbers.value = [...newNumbers]
            
            // 触发新球的滚动动画
            if (!sevenStarRollingBalls.value.includes(newBallIndex)) {
              startSevenStarBallRolling(newBallIndex)
            }
          } else if (sevenStarNumbers.value.length === 0 || JSON.stringify(newNumbers) !== JSON.stringify(sevenStarNumbers.value)) {
            // 完全新的一期开奖或第一次加载
            console.log('新的一期或首次加载：新号码', newNumbers, '当前号码', sevenStarNumbers.value)
            // 如果是新的一期（号码不同），触发逐个展示动画
            if (sevenStarNumbers.value.length > 0 && JSON.stringify(newNumbers) !== JSON.stringify(sevenStarNumbers.value)) {
              // 新的一期，逐个展示号码
              console.log('新的一期，逐个展示')
              sevenStarNumbers.value = []
              newNumbers.forEach((num, index) => {
                setTimeout(() => {
                  sevenStarNumbers.value = [...sevenStarNumbers.value, num]
                  if (index < newNumbers.length) {
                    startSevenStarBallRolling(index)
                  }
                }, index * (data.interval_ms || 800))
              })
            } else {
              // 第一次加载，直接显示所有号码
              console.log('首次加载，直接显示所有号码')
              sevenStarNumbers.value = [...newNumbers]
            }
          }
        } else if (sevenStarNumbers.value.length > 0 && !data.is_drawing) {
          // 没有结果且不在开奖中，但之前有，清空
          sevenStarNumbers.value = []
        } else if (data.is_drawing && sevenStarNumbers.value.length > 0) {
          // 进入开奖中状态，清空之前的结果
          sevenStarNumbers.value = []
        }
        
        // 检测开奖完成：从开奖中状态变成非开奖中，且有7个号码
        const isDrawComplete = wasDrawing && !data.is_drawing && useNumbers.length >= 7;
        
        // 转换数据格式用于原有显示
        const transformed = transformSevenStarData(res);
        if (transformed) {
          // 确保特码是 seven_star_numbers 的最后一个
          if (useNumbers.length > 0) {
            let numberarr = useNumbers.map(e => String(e).padStart(2, '0'));
            let sbarr = useNumbers.map(e => {
              let c = getColors(e);
              return c === 'red' ? 'red' : c === 'blue' ? 'blue' : 'green';
            });
            let sxarr = useNumbers.map(e => getSevenStarZodiac(e));
            let ball = [];
            hasNewIndex.value = numberarr.length-1;
            
            numberarr.forEach((j, i) => {
              ball.push({
                num: j,
                sb: sbarr[i],
                sx: sxarr[i],
              });
            });
            transformed.ball = ball;
            
            // 确保特码是第7个号码（最后一个）
            if(useNumbers.length >= 7){
              const lastNumber = useNumbers[6];
              transformed.lastBall = {
                num: String(lastNumber).padStart(2, '0'),
                sb: sbarr[6],
                sx: sxarr[6]
              };
            }
            // 确保 transformed 也有正确的 seven_star_numbers
            transformed.seven_star_numbers = useNumbers;
          }
          
          winresultsinfo.value = transformed;
          
          // 设置下一期信息用于倒计时
          let nextDate = transformed.date + 86400;
          
          // 优先使用当前开奖接口返回的 next_draw_time
          if (data.next_draw_time) {
            let nextTime = new Date(data.next_draw_time);
            if (!isNaN(nextTime.getTime())) {
              nextDate = Math.floor(nextTime.getTime() / 1000);
            }
          }
          // 然后使用 transformed.next_draw_time
          else if (transformed.next_draw_time) {
            let nextTime = new Date(transformed.next_draw_time);
            if (!isNaN(nextTime.getTime())) {
              nextDate = Math.floor(nextTime.getTime() / 1000);
            }
          }
          // 如果没有 next_draw_time，使用后台配置的 nextDrawTime
          else if (scheduleConfig.value.nextDrawTime) {
            let nextTime = new Date(scheduleConfig.value.nextDrawTime);
            if (!isNaN(nextTime.getTime())) {
              nextDate = Math.floor(nextTime.getTime() / 1000);
            }
          }
          
          nextwinresultst.value = {
            year: String(new Date().getFullYear()),
            period: String(parseInt(transformed.period) + 1),
            date: nextDate,
            status: 0
          };
          
          // 启动倒计时
          countdownTimeStr(nextDate);
          
// if (useNumbers.length > 0) {
//             // ★★★ 关键修复：直接复用 transformed（顶部显示对象）作为历史记录数据源，保证期号/日期完全一致 ★★★
//             // 这样 top 显示的 winresultsinfo.period 和 history 显示的 scope.row.period 一定相同
//             const transformedForList = {
//               ...transformed,
//               seven_star_numbers: useNumbers,
//               isDrawing: data.is_drawing,
//               videoUrl: '',
//               id: data.id || Date.now()
//             };

//             if (useNumbers.length >= 7) {
//               const lastNumber = useNumbers[6];
//               transformedForList.lastBall = {
//                 num: String(lastNumber).padStart(2, '0'),
//                 sb: '',
//                 sx: getSevenStarZodiac(lastNumber)
//               };
//             }
//             transformedForList.ball = useNumbers.map((n) => ({
//               num: String(n).padStart(2, '0'),
//               sb: '',
//               sx: getSevenStarZodiac(n)
//             }));

//             // ★★★ 关键修复：添加/更新记录前，清理其他所有七星彩记录的"开奖中"状态 ★★★
//             // 确保任何时候都只有一条记录显示"开奖中"（或都不显示）
//             resultslist.value.forEach((item, idx) => {
//               if (item.lotteryType === 'QXC' && item.status === 1 && item.period !== transformedForList.period) {
//                 const updated = { ...item, status: 2, isDrawing: false };
//                 resultslist.value[idx] = updated;
//               }
//             });

//             // 检查这个期号是否已经在列表中
//             const existingIndex = resultslist.value.findIndex(item => item.period === transformedForList.period);
//             if (existingIndex === -1) {
//               // 不在列表中，加入到开头
//               resultslist.value.unshift(transformedForList);
//               // 保持列表长度不超过分页大小
//               if (resultslist.value.length > pageSize.value) {
//                 resultslist.value.pop();
//               }
//               // ★★★ 记录本地添加的期号，防止 getdatalist 覆盖 ★★★
//               locallyAddedPeriod.value = transformedForList.period;
//               if (data.is_drawing) {
//                 console.log("开奖中：最新一期已加入历史列表顶部", transformedForList.period, useNumbers, "locallyAddedPeriod:", locallyAddedPeriod.value);
//               } else {
//                 // 开奖完成的新结果，总数+1
//                 total.value = total.value + 1;
//                 console.log("开奖完成：最新一期已加入历史列表顶部", transformedForList.period, useNumbers, "locallyAddedPeriod:", locallyAddedPeriod.value);
//               }
//             } else if (existingIndex === 0) {
//               // 已在列表开头，直接更新号码（关键：开奖中每次获取新号码都更新这里）
//               resultslist.value[0] = transformedForList;
//               // ★★★ 更新本地添加期号的记录 ★★★
//               locallyAddedPeriod.value = transformedForList.period;
//               console.log(data.is_drawing ? "开奖中：更新列表顶部号码" : "开奖完成：更新列表顶部号码", transformedForList.period, useNumbers, "locallyAddedPeriod:", locallyAddedPeriod.value);
//             } else {
//               // 已在列表中但不在开头，移到开头
//               resultslist.value.splice(existingIndex, 1);
//               resultslist.value.unshift(transformedForList);
//               locallyAddedPeriod.value = transformedForList.period;
//               console.log("把最新一期移到列表顶部", transformedForList.period, "locallyAddedPeriod:", locallyAddedPeriod.value);
//             }
//           }

          // ===== 开奖完成后延迟刷新历史接口，且调用时保留本地最新数据 =====
          // 1. 开奖中（is_drawing = true）：绝对不调用 getdatalist()
          // 2. 刚开奖完成（isDrawComplete = true）：延迟一段时间后调用，带标记保留本地数据          // 3. 其他时间且无号码：正常刷新
          if (data.is_drawing || sevenStarIsDrawing.value) {
            // 开奖中：不刷新历史接口，等待开奖完成
            console.log("开奖中：跳过 getdatalist，历史列表保持不变");
            // 清除可能残留的开奖完成刷新定时器
            if (drawingRefreshTimer.value) {
              clearTimeout(drawingRefreshTimer.value);
              drawingRefreshTimer.value = null;
            }
          } else if (isDrawComplete) {
            // 开奖刚完成：延迟2秒刷新一次完整历史列表
            console.log("开奖完成：延迟2秒刷新历史接口");
            if (drawingRefreshTimer.value) {
              clearTimeout(drawingRefreshTimer.value);
            }
            drawingRefreshTimer.value = setTimeout(() => {
              console.log("开奖完成延迟刷新：执行 getdatalist()");
              getdatalist();
              drawingRefreshTimer.value = null;
            }, 2000);
          } else if (useNumbers.length === 0) {
            // 非开奖中且无号码：正常刷新历史
            console.log("非开奖中且无号码，刷新历史");
            getdatalist();
          } else {
            console.log("非开奖中已有号码：跳过 getdatalist");
          }
        }
      }
    } catch (err) {
      console.error('获取七星彩数据失败', err);
      loading.value = false;
    }
  } else {
    // 原有的API处理逻辑
    const res = await getNewDataApi({
      year: year.value.getFullYear(),
      lotteryType: categoryId.value,
    });
    loading.value = false;
     let list = res.data;
    if (res.code === 200) {
    
      
      list.forEach(async (x, s) => {
        if (x.status == 0) {
          nextwinresultst.value = x;
          countdownTimeStr(nextwinresultst.value.date);
        } else {
          if(+winresultsinfo.value.ball[0]!==+x.numbers.slice(0,1)&&!hasNewRes.value){
             hasNewRes.value = true

          }
          resFn(x)   
        }
      });
    } else {
      if (timer) {
        clearInterval(timer);
      }
    }
  }
};
function getImageUrl(name) {
  return new URL(`${name}`, import.meta.url).href
}
const logo = computed(()=>{
   let url
  if(winresultsinfo.value.lotteryType){
       url = getImageUrl(`../../assets/${winresultsinfo.value.lotteryType}.png`)
  }

  console.log("sd",url,winresultsinfo.value)
  return url 
})

const  hasOpenStatus = ref(false)
const isOpen = (K='_openTime',num)=>{
  let open = false
  if(indMenu.value[K]){
    let timeArr = indMenu.value[K].split("-");
    if(timeArr.length==2){
      let start = timeArr[0].split(":");
      let end = timeArr[1].split(":");
      let now = new Date();
      let startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), start[0], start[1]);
      let endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), end[0], end[1]);
      open = now >= startTime && now <= endTime;
      if(isSevenStar.value){
       return open && (!num || num=='')
      }
    //  console.log("sd=是否要开奖了",open,open&&resultslist.value.length>0&&new Date(resultslist.value[0].date*1000).getDay() == new Date().getDay(),resultslist.value[0]?.ball.length)
      if(open&&resultslist.value.length>0&&new Date(resultslist.value[0].date*1000).getDay() == new Date().getDay()&&resultslist.value[0]?.ball.length==6){
         isOpenBotKai.value = false
        return open
      }
      if(open&&!isOpenBotKai.value&&!hasOpenStatus.value&&winresultsinfo.value.status==2){
        isOpenBotKai.value = true
        hasOpenStatus.value = true
        resFn(nextwinresultst.value)
        console.log("sd=准备开奖了",winresultsinfo.value)
      }
      
      if(hasOpenStatus.value&&resultslist.value&&resultslist.value[0]&&winresultsinfo.value.period!==resultslist.value[0].period&& !hasPushNewResult.value&&(winresultsinfo.value.status==1||hasNewRes.value)){
              hasPushNewResult.value = true
            resultslist.value.unshift(tableListFn(winresultsinfo.value))
             
      }
      if(open&&isOpenBotKai.value&&hasOpenStatus.value&&((winresultsinfo.value.status==1&&winresultsinfo.value.ball&&winresultsinfo.value.ball.length<7))){
        isOpenBotKai.value = false
        
        console.log("sd=正在开奖中了",open)

      }
console.log("sd=sddds",winresultsinfo.value.status,winresultsinfo.value.ball,isOpenBotKai.value)
      if(winresultsinfo.value.status==2&&(!open) &&isOpenBotKai.value){
        isOpenBotKai.value = false
        console.log("sd=开完奖了",open)
      }
    }
     
  }
    // console.log("sd=开奖1了",open)
  return open && (!num || num=='')
}
const showLive = computed(()=>{
  let isShow  = false
  let lic = Date.now() - new Date(nextwinresultst.value.date);
  let show = +winresultsinfo.value.status==1|| isOpen('_openTime');  
  if(show){
     isShow = true
  }
 return show
})
// watch(()=>winresultsinfo.value.status,(val)=>{
//   console.log("sd=监听开奖状态变化",val)
//   if(isOpen('_openTime')&&(+val==1)&&!isOpenBotKai.value&&hasOpenStatus.value&resultslist.value[resultslist.value.length-1].period!==winresultsinfo.value.period){
//   }
// })
watch(()=>winresultsinfo.value.ball,(val)=>{
  console.log("sd=监听列表开奖状态变化",val,(+val==1||+val==2),isOpenBotKai.value,hasOpenStatus.value,winresultsinfo.value)
  if(isOpen('_openTime')&&((+val==1||+val==2||hasNewRes.value)&&(!isOpenBotKai.value||hasPushNewResult.value))&&hasOpenStatus.value){
   resultslist.value[0] = tableListFn(winresultsinfo.value)
  }
})
const tableListFn = (x)=>{
  let obj = {
    ...x,
    lastBall: {
      num: '',
      sb: '',
      sx: ''
    },
    ball: [],
    lastNum: '',
    total: 0,
    videoUrl: ''
  }
   let numberarr = x.numbers.split(",");
          let lastNum = [...numberarr].pop();
          let sbarr = x.sb.split(",");
          let sxarr = x.sx.split(",");
          let wxarr = x.wx.split(",");
          let ball = [];
          let total = 0;
          numberarr.forEach((j, i) => {
            total += Number(j);
            ball.push({
              num: j,
              sb: sbarr[i],
              sx: sxarr[i],
              wx: wxarr[i],
            });
          });
          console.log("dsd1",ball)
          if(ball.length==7){
          obj.lastBall = ball.pop();
          }
          
          obj.ball = ball;
          obj.lastNum = lastNum;
          obj.total = total;
          obj.videoUrl = x.videoUrl || (winresultsinfo.value.lotteryType=='MO'?"https://vod.cctywlkj.com/lottery/video/":"https://video2m6-qq.dldydn.com/" ) + x.year+'/2032/'+ x.year+x.period + ".mp4";
    return obj
}
const getdatalist = async (isInt) => {
  if(isInt){
    tableLoading.value = true;
  }
  
  
  if (isSevenStar.value) {
    // 七星彩的历史数据处理
    try {
      const res = await getSevenStarHistoryApi({
        page: pageNum.value,
        limit: pageSize.value
      });
      tableLoading.value = false;
      
      // 兼容两种返回格式：{ list, total } 或纯数组
      let list = [];
      let totalCount = 0;
      let apiData = null;
      
      // 首先检查 res.data 是否是对象（axios会自动解析data）
      if (res && res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
        apiData = res.data;
      } else if (res && typeof res === 'object' && !Array.isArray(res) && 'list' in res) {
        apiData = res;
      }
      
      let historyData = [];
      if (apiData) {
        historyData = Array.isArray(apiData.list) ? apiData.list : [];
        totalCount = typeof apiData.total === 'number' ? apiData.total : historyData.length;
      } else {
        historyData = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
        totalCount = historyData.length;
      }
      
      historyData.forEach((x) => {
        // 确保我们有完整的7个号码
        const sevenStarNumbers = x.seven_star_numbers || x.numbers || [];
        const fullNumbers = sevenStarNumbers.length >= 7 ? sevenStarNumbers : (x.numbers || []);
        
        // 把Flask后端数据转换为前端需要的格式
        const transformed = transformSevenStarData({
          data: {
            numbers: x.all_20_numbers || [],
            issue_number: x.issue_number,
            created_at: x.created_at,
            super_number: null,
            big_small: null,
            single_double: null,
            is_drawing: false,
            show_zodiac: true,
            draw_mode: 'bingo_sevenstar',
            all_20_numbers: x.all_20_numbers || x.numbers || [],
            seven_star_numbers: fullNumbers,
            zodiacs: {}
          }
        });
        
        if (transformed) {
          // 确保特码是第7个号码
          if (fullNumbers.length >= 7) {
            const lastNumber = fullNumbers[6];
            transformed.lastBall = {
              num: String(lastNumber).padStart(2, '0'),
              sb: '',
              sx: getSevenStarZodiac(lastNumber)
            };
            // 确保seven_star_numbers有完整的7个号码
            transformed.seven_star_numbers = fullNumbers;
          }
          
          transformed.id = x.id;
          transformed.videoUrl = '';
          list.push(transformed);
        }
      });
      
      // ★★★ 关键修复：确保列表中最多只有一条七星彩记录显示"开奖中" ★★★
      // 找到第一个 status=1 的记录，其余所有记录的 status 重置为 2
      let foundDrawing = false;
      for (let i = 0; i < list.length; i++) {
        if (list[i].lotteryType === 'QXC' && list[i].status === 1) {
          if (!foundDrawing) {
            foundDrawing = true;
          } else {
            // 已经找到一条开奖中的记录，其余重置为已开奖
            list[i] = { ...list[i], status: 2, isDrawing: false };
          }
        }
      }

      resultslist.value = list;
      total.value = totalCount;
      console.log("getdatalist 完成：resultslist.length =", resultslist.value.length, "total =", total.value);
    } catch (err) {
      console.error('获取七星彩历史数据失败', err);
      tableLoading.value = false;
    }
  } else {
    // 原有的历史数据处理
    const res = await datalistApi({
      year: year.value.getFullYear(),
      lotteryType: categoryId.value,
      status: 2,
      pageNum: pageNum.value,
      pageSize: pageSize.value,
    });
    tableLoading.value = false;
    if (res.code === 200) {
      total.value = res.total;
      if(pageNum.value==1 && (new Date(res.rows[0].date*1000)).getDay() == new Date().getDay()){
        isOpenBotKai.value = false
      }
      if (res.rows) {
        let list = [];
        res.rows.forEach((x) => {
          
          list.push(tableListFn(x));
        });
        resultslist.value = list;
      }
    }
  }
  
  nextTick(()=>{
    tableRef.value.scrollTo&&tableRef.value.scrollTo({ top: 0 });
  })
  
};

const segmentedChange = (rev) => {
  // 如果是七星彩，初始化默认值
  if (isSevenStar.value) {
    if (!winresultsinfo.value.lotteryType) {
      winresultsinfo.value = {
        lotteryType: 'QXC',
        year: String(new Date().getFullYear()),
        period: '001',
        date: Math.floor(Date.now() / 1000),
        status: 0,
        ball: [],
        seven_star_numbers: [],
        all_20_numbers: []
      };
    }
    // 不要在这里设置默认倒计时，等后端数据回来再说
  }
  
  // 如果是七星彩，先获取后台配置
  if (isSevenStar.value) {
    getScheduleConfig();
  }
  
  getNewData();
  pageNum.value = 1;
  if(!rev){
     getdatalist(1);
   
  }

};

const handleCurrentChange = (val) => {
  pageNum.value = val;
  getdatalist();
};

const disabledDate = (time) => {
  return time.getTime() > Date.now();
};

const onYearChange = (e) => {
  pageNum.value = 1;
  getdatalist();
};

// 获取后台开奖配置
const getScheduleConfig = async () => {
  if (!isSevenStar.value) return;
  try {
    const res = await getScheduleConfigApi();
    if (res.data && res.data.success) {
      const config = res.data.data;
      scheduleConfig.value = {
        liveStreamUrl: config.live_stream_url || '',
        redirectUrl: config.redirect_url || '',
        nextDrawTime: config.next_draw_time,
        intervalSeconds: config.interval_seconds || 30
      };
      console.log('获取到后台配置:', scheduleConfig.value);
    }
  } catch (err) {
    console.error('获取后台配置失败:', err);
  }
};

//回放
const playback = (item) => {
  // 七星彩直接跳转到第三方开奖地址
  if (isSevenStar.value) {
    const thirdPartyUrl = scheduleConfig.value.redirectUrl || indMenu.value.liveUrl2 || "https://www.cwl.gov.cn/kjxx/qxc/";
    window.open(thirdPartyUrl, "_blank");
    return;
  }
  
  playbackinfo.value = {
    dialogVisibleTitle:
      codeToLottery(item.lotteryType) + "：第" + item.year + item.period + "期",
    videoUrl: item.videoUrl,
    liveUrl:item.liveUrl,
  };
  dialogVisible.value = true;
};
  const isDrawStatus = computed(()=>{
    console.log("isDrawStatus",winresultsinfo.value.ball)
    return sevenStarIsDrawing.value&&winresultsinfo.value.ball.length<7
  })
// 倒计时
const countdownTimeStr = (timestamp) => {
  clearInterval(timer.value);
  
  console.log("启动倒计时，目标时间:", new Date(timestamp * 1000));
  
  // 立即更新一次倒计时显示
  let now = Date.now();
  let diff = Math.max(0, timestamp * 1000 - now);
  const total = Math.floor(diff / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, "00");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "00");
  const s = String(total % 60).padStart(2, "00");
  countdownTime.value = [h, m, s];
  
  // 如果是七星彩，启动独立的倒计时
  if (isSevenStar.value) {
    startSevenStarCountdown(timestamp);
  }
  
  timer.value = setInterval(() => {
    let now = Date.now();
    let diff = Math.max(0, timestamp * 1000 - now);
    const total = Math.floor(diff / 1000);
    const h = String(Math.floor(total / 3600)).padStart(2, "00");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "00");
    const s = String(total % 60).padStart(2, "00");
    countdownTime.value = [h, m, s];
    
    if (total % 60 === 0) {
      console.log("倒计时更新:", h, m, s);
    }
    
    if (countdownTime.value.length > 0 && diff <= 800) {
      if (
        countdownTime.value[0] == "00" &&
        countdownTime.value[1] == "00" &&
        countdownTime.value[2] == "00"
      ) {
        console.log("倒计时结束，刷新数据");
        clearInterval(timer.value);
        if (!isRef.value) {
          // 刷新开奖结果
          getNewData(1);
          // 刷新配置获取下一期时间
          if (isSevenStar.value&&winresultsinfo.value.ball.length==7) {
            setTimeout(() => {
              getScheduleConfig();
            }, 2000);
          }
          // ★★★ 关键修复：七星彩开奖中/刚开奖时绝对不调用 getdatalist() ★★★
          // 只有非七星彩模式才在倒计时结束后刷新历史接口
          // 七星彩开奖完成后，由 getNewData 内部逻辑决定是否刷新
          if (!isSevenStar.value) {
            setTimeout(() => {
              isRefList.value = true;
              getdatalist();
            }, 2000);
          } else {
            console.log("七星彩：倒计时结束，但不立即调用 getdatalist，由 getNewData 控制历史刷新");
          }
        }
      }
    }
  }, 1000);
};
let sevenStarKaiInterval = null
// 七星彩倒计时函数
function startSevenStarCountdown(targetTimestamp) {
  if (sevenStarCountdownInterval) {
    clearInterval(sevenStarCountdownInterval);
  }
  let now = Date.now();
  let diff = Math.max(0, targetTimestamp * 1000 - now);
  // 立即更新一次倒计时显示
  if (!sevenStarIsDrawing.value) {
    if (sevenStarKaiInterval) {
    clearInterval(sevenStarKaiInterval);
  }
    const total = Math.floor(diff / 1000);
    sevenStarCountdownHours.value = String(Math.floor(total / 3600)).padStart(2, "00");
    sevenStarCountdownMinutes.value = String(Math.floor((total % 3600) / 60)).padStart(2, "00");
    sevenStarCountdownSeconds.value = String(total % 60).padStart(2, "00");
  }else{
        if (diff <= 800) {
   sevenStarKaiInterval =  setInterval(()=>{
          getNewData(1);
    },config.value.drawing_duration*1000+10)
  }
  }

  sevenStarCountdownInterval = setInterval(() => {
    // 如果正在开奖中，不更新倒计时
    if (sevenStarIsDrawing.value) {

      return;
    }
    
     let now = Date.now();
    let diff = Math.max(0, targetTimestamp * 1000 - now);
    const total = Math.floor(diff / 1000);
    sevenStarCountdownHours.value = String(Math.floor(total / 3600)).padStart(2, "00");
    sevenStarCountdownMinutes.value = String(Math.floor((total % 3600) / 60)).padStart(2, "00");
    sevenStarCountdownSeconds.value = String(total % 60).padStart(2, "00");
    
    // 倒计时结束，刷新数据
    if (diff <= 800) {
      clearInterval(sevenStarCountdownInterval);
      getNewData(1);
    }
  }, 1000);
}

// getNewData();
// getdatalist();
// 页面加载后执行动画
onMounted(() => {
   segmentedChange();
    setTimeout(() => {
       setInterval(()=>{
          let op = isOpen();
          let shouldRefresh = false;
          
          // 判断是否应该刷新：七星彩只在开奖中时刷新 getNewData，不刷新历史接口
          if (isSevenStar.value) {
            shouldRefresh =  sevenStarIsDrawing.value;
            console.log("七星彩刷新判断 - sevenStarIsDrawing:", sevenStarIsDrawing.value, "shouldRefresh:", shouldRefresh,config.value,config.value.drawing_duration*1000+10);
          } else {
            shouldRefresh = op;
          }
          
        if(shouldRefresh){
            // 开奖中的情况下才定时刷新（七星彩只刷新最新号码，不刷新历史接口）
            console.log("sd=刷新数据 - shouldRefresh:", shouldRefresh);
            getNewData();
        }else if(!isSevenStar.value && +resultslist.value[0]?.period!==winresultsinfo.value.period&&+winresultsinfo.value.status==2&&!isRefList.value){
          // 注意：只有非七星彩才通过这个条件刷新历史接口
          // 七星彩的历史列表由 getdatalist() 统一刷新
          console.log("sd=close",op)
          isRefList.value = true
           getdatalist();
        }
      },(isSevenStar.value && sevenStarIsDrawing.value) ? (sevenStarIntervalMs.value + 100) : (!isSevenStar.value && isOpen()) ?5000:60000)
    }, 5000);
  //   nextTick(() => {
  //   });
});
onUnmounted(() => {
  clearInterval(timer.value);
  if (sevenStarCountdownInterval) {
    clearInterval(sevenStarCountdownInterval);
  }
});
</script>

<style scoped lang="scss">
.margt20{
  float: right;
    padding: 10px;
    border-left: 1px solid #f0f0f0;
}

::v-deep td,::v-deep th{
  padding:  0 !important;
.cell{
  font-size: 15px !important;
  padding:3px  0 !important;
  *{
    font-size: 15px !important;
  }
   button {
    line-height: 25px !important;
    height:25px !important;
    *{
    font-size: 13px !important;
    line-height: 25px !important;
    height:25px !important;
  }
   }
}
} 
.animated-ball {
  animation: fadeInScale 0.5s ease-out forwards;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 七星彩滚动球动画 */
/*.rolling-ball, .ball-rolling {
  animation: ballRoll 0.6s ease-out;
}*/

@keyframes ballRoll {
  0% {
    transform: rotate(0deg) scale(0);
    opacity: 0;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 1;
  }
}
</style>
