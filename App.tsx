
import React, { useState } from 'react';
import { DayType, CalendarDay } from './types';
import { WEEKDAYS, COLORS, isHoliday } from './constants';

const CalendarCell: React.FC<{ day: CalendarDay }> = ({ day }) => {
  const isWeekend = day.type === DayType.WEEKEND;
  const isHolidayDay = day.type === DayType.HOLIDAY;
  const isBRD = day.type === DayType.MILESTONE_BRD;
  const isRPD = day.type === DayType.MILESTONE_RPD;

  let textColor = "text-slate-600";
  let bgColor = "bg-white";
  let subText = "";

  if (isHolidayDay) {
    textColor = "text-rose-500";
  }

  if (isWeekend && !isBRD && !isRPD) {
    bgColor = "bg-slate-50";
  }

  if (isBRD) {
    bgColor = "bg-rose-500 shadow-md shadow-rose-200";
    textColor = "text-white font-bold";
    subText = "BRD";
  } else if (isRPD) {
    bgColor = "bg-indigo-500 shadow-md shadow-indigo-200";
    textColor = "text-white font-bold";
    subText = "RPD";
  }

  return (
    <div className={`relative h-11 flex flex-col items-center justify-center rounded-lg border border-slate-100 shadow-sm ${bgColor} ${textColor} transition-transform active:scale-95`}>
      <span className="text-xs font-semibold">{day.day}</span>
      {subText && <span className="text-[9px] mt-0.5 font-black uppercase tracking-tighter leading-none">{subText}</span>}
    </div>
  );
};

const SprintSection: React.FC<{ 
  id: string; 
  monthLabel?: string; 
  weeks: CalendarDay[][]; 
  colorClass: string;
}> = ({ id, monthLabel, weeks, colorClass }) => {
  return (
    <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`h-4 w-1 rounded-full ${colorClass}`}></div>
          <span className={`text-[11px] font-black uppercase tracking-widest ${colorClass.replace('bg-', 'text-')}`}>{id}</span>
        </div>
        {monthLabel && (
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{monthLabel}</span>
        )}
      </div>

      <div className="grid grid-cols-[30px_repeat(7,1fr)] gap-1.5">
        {weeks.map((week, wIdx) => (
          <React.Fragment key={wIdx}>
            <div className="flex items-center justify-center text-[10px] font-bold text-slate-300 italic">
              {week[0].weekNum}
            </div>
            {week.map((day, dIdx) => (
              <CalendarCell key={dIdx} day={day} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const generateSprint = (
    id: string, 
    monthLabel: string | undefined, 
    weekStart: number, 
    days: number[][], 
    milestones: Record<number, DayType>,
    monthNum: number,
    yearNum: number = 2026
  ) => {
    const weeks = days.map((weekDays, wIdx) => {
      return weekDays.map((d, dIdx) => {
        let type = DayType.NORMAL;
        if (dIdx >= 5) type = DayType.WEEKEND;
        if (isHoliday(yearNum, monthNum, d)) type = DayType.HOLIDAY;
        if (milestones[d]) type = milestones[d];
        
        return {
          day: d,
          month: monthNum,
          year: yearNum,
          type,
          isCurrentMonth: true,
          weekNum: weekStart + wIdx
        } as CalendarDay;
      });
    });
    return { id, monthLabel, weeks };
  };

  const sprints = [
    generateSprint("PRE", "2025.12 - 2026.01", 1, [[29, 30, 31, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]], { 1: DayType.HOLIDAY }, 1, 2026),
    generateSprint("S1", "2026.01", 3, [[12, 13, 14, 15, 16, 17, 18], [19, 20, 21, 22, 23, 24, 25]], { 16: DayType.MILESTONE_BRD, 23: DayType.MILESTONE_RPD }, 1),
    generateSprint("S2", undefined, 5, [[26, 27, 28, 29, 30, 31, 1], [2, 3, 4, 5, 6, 7, 8]], { 30: DayType.MILESTONE_BRD, 6: DayType.MILESTONE_RPD }, 1),
    generateSprint("S3", "2026.02", 7, [[9, 10, 11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22]], { 16: DayType.HOLIDAY, 17: DayType.HOLIDAY, 18: DayType.HOLIDAY, 19: DayType.HOLIDAY, 20: DayType.HOLIDAY }, 2),
    generateSprint("S4", undefined, 9, [[23, 24, 25, 26, 27, 28, 1], [2, 3, 4, 5, 6, 7, 8]], { 27: DayType.MILESTONE_BRD, 6: DayType.MILESTONE_RPD }, 2),
    generateSprint("S5", "2026.03", 11, [[9, 10, 11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22]], { 13: DayType.MILESTONE_BRD, 20: DayType.MILESTONE_RPD }, 3),
    generateSprint("S6", undefined, 13, [[23, 24, 25, 26, 27, 28, 29], [30, 31, 1, 2, 3, 4, 5]], { 27: DayType.MILESTONE_BRD, 4: DayType.HOLIDAY, 5: DayType.HOLIDAY }, 3),
    generateSprint("S7", "2026.04", 15, [[6, 7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18, 19]], { 6: DayType.HOLIDAY, 10: DayType.MILESTONE_BRD, 17: DayType.MILESTONE_RPD }, 4),
    generateSprint("S8", undefined, 17, [[20, 21, 22, 23, 24, 25, 26], [27, 28, 29, 30, 1, 2, 3]], { 1: DayType.HOLIDAY, 2: DayType.HOLIDAY, 3: DayType.HOLIDAY }, 4),
    generateSprint("S9", "2026.05", 19, [[4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15, 16, 17]], { 4: DayType.HOLIDAY, 5: DayType.HOLIDAY, 8: DayType.MILESTONE_BRD, 15: DayType.MILESTONE_RPD }, 5),
    generateSprint("S10", undefined, 21, [[18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30, 31]], { 22: DayType.MILESTONE_BRD, 29: DayType.MILESTONE_RPD }, 5),
    generateSprint("S11", "2026.06", 23, [[1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14]], { 5: DayType.MILESTONE_BRD }, 6),
    generateSprint("S12", undefined, 25, [[15, 16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27, 28]], { 19: DayType.HOLIDAY, 20: DayType.HOLIDAY, 26: DayType.MILESTONE_RPD }, 6),
    generateSprint("S13", "2026.07", 27, [[29, 30, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11, 12]], { 3: DayType.MILESTONE_BRD, 10: DayType.MILESTONE_RPD }, 7),
  ];

  const handleDownloadProject = () => {
    setIsExporting(true);
    // 模拟导出所有核心组件代码
    const projectContent = `
=== VOP 2026 H1 PROJECT BACKUP ===
Generated: ${new Date().toISOString()}

--- App.tsx ---
${document.querySelector('script[type="module"]')?.innerHTML || '见当前编辑器内容'}

--- 提示 ---
1. 如果要在新电脑恢复，请将这段文字提供给 AI 助手。
2. 建议直接在当前页面按下 Ctrl+S 保存完整的 HTML。
    `;
    
    const blob = new Blob([projectContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VOP_Calendar_Backup_${new Date().toLocaleDateString()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsExporting(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-20">
      <header className="bg-white p-6 border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">VOP 定制项目</h1>
            <p className="text-[13px] font-bold text-slate-400 mt-0.5">26年 H1 交付版本日历</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-rose-50 rounded-md border border-rose-100">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              <span className="text-[9px] font-bold text-rose-600 uppercase">BRD 评审</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 rounded-md border border-indigo-100">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              <span className="text-[9px] font-bold text-indigo-600 uppercase">RPD 评审</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-[30px_repeat(7,1fr)] gap-1.5 mb-4 sticky top-[92px] bg-slate-50/90 backdrop-blur-sm py-2 z-10">
          <div></div>
          {WEEKDAYS.map((w, i) => (
            <div key={i} className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
              {w}
            </div>
          ))}
        </div>

        {sprints.map((s, idx) => (
          <SprintSection 
            key={idx} 
            id={s.id} 
            monthLabel={s.monthLabel} 
            weeks={s.weeks} 
            colorClass={COLORS[s.id] || 'bg-slate-400'}
          />
        ))}

        <footer className="py-8 text-center opacity-30 select-none">
          <p className="text-[9px] font-black tracking-[0.5em] text-slate-900 uppercase">INTERNAL AGILITY TOOL V2.0</p>
          <p className="text-[8px] mt-2 text-slate-500 italic">防止丢失：点击右下角按钮下载备份文件</p>
        </footer>
      </main>

      {/* Persistence Button */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <button 
          onClick={handleDownloadProject}
          className={`${isExporting ? 'bg-green-600' : 'bg-blue-600'} text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all font-bold text-sm`}
        >
          {isExporting ? (
            <>已保存备份文件</>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V4a1 1 0 10-2 0v7.586l-1.293-1.293z" />
                <path d="M5 17a2 2 0 01-2-2V7a2 2 0 012-2 1 1 0 010 2v8h10V7a1 1 0 112 0v8a2 2 0 01-2 2H5z" />
              </svg>
              一键下载备份
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
