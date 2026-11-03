# 04｜剧情分支、选择与变量

## 不变量

无论结局如何：奥古斯特已死、阿尔杰农仍活、身份长期互换、阿尔杰农策划最终骗局。分支只改变玩家能否证明、如何定性、向谁公开，以及艾薇是否追查更深层计划。

## 推荐章节

1. **序章｜第十三封邀请函**：艾薇抵达，阿瑟展示书房尸体。
2. **第一幕｜十二种“见过”**：核心人物证词，玩家默认都在说同一位爵士。
3. **第二幕｜错误的日期**：档案证词解锁，拆开真实时间和玩家理解时间。
4. **第三幕｜两个名字**：照片、怀表、惯用手揭示第二个人。
5. **第四幕｜没有旧伤的尸体**：医疗记录推翻阿尔杰农身份。
6. **第五幕｜旧温室**：重建争执、坠落、延误救助和移尸。
7. **终幕｜第十三位证人**：爱德华完成证词，玩家选择是否公开。
8. **隐藏尾声｜第十四位？**：艾薇发现自己也在邀请计划之中。

## 关键玩家选择

| 选择 | 影响 |
|---|---|
| 是否把证词按日期重排 | 解锁真实时间线 |
| 是否坚持独立鉴定 | 决定 TRUE END 与《完美的谎言》分界 |
| 是否信任/质询爱德华 | 影响 W13 证词、关系和人物结局 |
| 是否公开实验档案 | 决定家族、奥古斯特名誉与爱德华继承 |
| 如何定性温室事件 | 区分事故、延误救助、故意推搡和预谋杀害 |
| 是否追查邀请函暗记 | 解锁秘密结局 |
| 最终向警方提交哪些证据 | 决定公开程度和案件法律状态 |

## 实现变量

- 核心证据：photo_twins、watch_pair_matched、algernon_medical_record、august_medical_record、independent_id_confirmed、greenhouse_blood_matched、greenhouse_log_found、last_letter_found、carriage_record_corrected、invitation_mark_found、experiment_archive_found、edward_child_record_found。
- 推理状态：two_people_proven、corpse_not_algernon、corpse_is_august、algernon_alive、death_scene_reconstructed、algernon_plan_proven、witnesses_resolved(0–12)、timeline_accuracy(0–100)。
- 关系/处置：edward_trust(-3–3)、ivy_edward_worldview(0–3)、archives_disclosed、police_report_complete、leave_alone。

## 结局判定优先级

1. 暗记、实验档案、童年记录齐全且独自追查 → END 05。
2. 真相完整、独立鉴定完成、温室还原且公开 → END 01。
3. 真相完整、高爱德华信任、选择封存 → END 03。
4. 发现双胞胎并接受结论，但缺独立鉴定 → END 02。
5. 其余证据不足但发现证词矛盾 → END 04。

## 防状态矛盾

- corpse_is_august 必须要求独立鉴定；爱德华记忆不能替代。
- algernon_alive 必须有11月1日马车记录和至少一项身份连续证据。
- death_scene_reconstructed 不等于 murder_proven。
- archives_disclosed=false 不删除玩家已知真相，只改变社会记录。
- 秘密结局不是推翻方案 A，而是在固定真相之外开启“谁选择艾薇”的新谜题。

