# Курсовая работа на тему "Андроид приложение для запоминания по системе Лейтнера"

# Введение

Цель:

Разработка мобильного приложения для запоминания
информации по системе Лейтнера.

Задачи:

- Изучить мнемонические системы
- Провести анализ уже существующей приложений в категории "приложения для запоминания".
- Провести анализ предметной области.
- Расмотреть инструменты для разработки мобильных приложений
- Провести анализ дизайна приложения, разбить на состовляющие компоненты.
- Составить требования к функционалу приложения.
- Разработать структуру и логику работы базы данных.
- Разработать функционал приложения, настроить взаимодействие с базой данных.
- Провести тестирование приложения, исправить найденные ошибки.


## Актуальность

С самого начала появления человека как вида
изучение новых навыков или знаний является одним из самых главных инструментов
его выживания, на протяжении многих сотен лет человек встречался с трудностями
и учился их преодолевать тем самым создавая новые знания, с каждым
столетием информационный след человечества рос, но и с той же скоростью росла
необходимость в передаче знаний будующим поколениям, таким образом
родилось преподование как профессия. На определенном этапе человечества
начального, по нашим меркам образования, хватало что бы получить работу и считатся
человеком исключительно образованным. Однако человек начал замечать что информация
преподоваемая в учебных организациях не успевает за развитием мира, таким образом
у человека появилась резкая потребность в самообразовании, эта потребность
позволила расширить некоротые отросли биологии, понимание работы человеческого мозка
и психологии, бихевиоризма. И на стыке двух этих наук родилась мнемоника - наука о запоминании.
С ее развитием было выялвено много паттернов в процессе обучения человека
спекулируя которыми можно было увеличить эффективность процесса обучения.
Учитывая реалии современного мира в которых процесс обучения идет непрерывно,
в больших обьемах, очень тяжело не обратится за помощью к мнемоническим техникам.
Так же было и со мной, в процессе обучения на направлении ИСиП мне было тяжело
усваивать информацию, поэтому я очень скоро престрастился к использованию
мнемонических техник. Мне понравилась система Лейтнера, за короткое время
я успел написать стопку карточек высотой с мою ладонь, мне стало неудобно
использовать эту технику, по этому я решил разработать мобильное приложение
позволяющее использовать данную технику дабы не только я но и другие люди
смогли сделать обучение хотябы немного, но проще. 

<!-- Обучение это комплексный процесс требующий много времени и усилий от учащегося.
В процессе развития биологии, психологии и мнемоники были выявлены некоторые
закономерности в процессе обучения человека, используя которые можно увеличить
эффективность изучения или того или иного
В начале обучения на направлении ИСиП мне было тяжело усваивать учебный материал,
я решил разработать мобильное приложение чтобы облегчить
начальные этапы процесса обучения. -->

<br>

## Разработанность темы

Приложений для запоминаний на рынке приложений очень много.
Самыми яркими проложениями данной категории являютмя "AnkiDroid" и "Quizlet"
Многие идеи которые я хотел воплотить в своем проекте
уже реализованы в других приложениях, однако мне не удалось
найти приложение которое соответствовало бы всем моим требованиям.

<br>

## Обьект исследования
Мобильные приложения для запоминания информации

## Предмет исследования
Мобильные приложения для запоминания информации по системе Лейтнера

<!--
Методы исследования - то как вы познаете мир.
Существует 2 категории методов изучения, имперический и теоретический

Теоретические:

- Анализ
- Синтез
- Дедукция
- Индукция
- Аксиоматика

Имперический

- Наблюдение
- Опрос
- Эксперемент
- ...
-->

## Методы исследования
В качестве основных методов исследования, использованных в данной работе можно называть:

- Метод анализа — изучение существующих интернет-энциклопедий астрономических объектов солнечной системы.
- Метод сравнения — сравнение существующих интернет-энциклопедий астрономических объектов между собой.
- Метод абстрагирования — создание схемы и принципа работы разрабатываемой интернет-энциклопедии.
- Метод эксперимента — создание интернет-энциклопедии и её последующая правка.


<!--

## С какими проблемами я столкнулся в процессе разработки

### I

Причиной выбора react native в качестве инструмента разработки приложения
было предположение того что инструмент разрабатываемой крупной компанией(Facebook)
будет иметь экосистему. На деле же react native предлагает минимальный набор компонентов
позволяющий используя их как основу создавать очень широкий спектр компонентов пользовательского интерфейса.

Так например для работы с файловой системой мобильного устройства мне пришлось использовать
форк официальной библиотеки для работы с файловой системой, по причине простоты подключеия данной библиотеки.
официальная библиотека требует внесения изменений в файлы сборщика итогового приложения, также по неизвестным
мне причинам она не работала корректно. Однако форк тоже был не без изьянов. При попытки прочитать данные из файла
функция возвращала строку случайных символов, если быть точнее я так думал.

функция принимает:

- путь к файлу.
- тип кодирования файла(utf8 по умолчанию).
- в какой формат декодировать файл(utf8 по умолчанию).

Я зашел в исходный код библиотеки и заметил что считываемый файл кодируется в base64.
Я воспользовался веб сервисами для декодирования строки. Я выяснил что данные из файла
считываются

 -->

# Источники


<!-- Правильно оформить источники -->
<!-- https://www.piter.com/ можно просмотреть isbin издателей и автора -->
1. Профессиональный TypeScript. Разработка масштабируемых JavaScriptприложений. — СПб.: Питер, 2021. — 352 с.: ил. — (Серия «Бестселлеры
O’Reilly»).
2. Изучаем SQL. Генерация, выборка и обработка данных, 3-е изд./
Алан Болье; пер. с англ. И.В. Красикова. — Киев. : “Диалектика”, 2021. — 402 с.: ил. — Парал. тит . англ.
3. React: современные шаблоны для разработки приложений. 2-е изд. — СПб.:
Питер, 2022. — 320 с.: ил. — (Серия «Бестселлеры O’Reilly»).
ISBN 978-5-4461-1492-4
4. Дизайн пользовательского опыта. Как создать продукт,
который ждут / Джон Уэлен ; пер. с англ. Э. Кондуковой ; науч. ред. М. Сташенко. — Москва : Манн, Иванов
и Фербер, 2021. — 272 с. : ил. — (Серия O’Reilly).
5. Head First. Паттерны проектирования. 2-е изд. — СПб.: Питер, 2022. — 640 с.: ил. — (Серия «Head
First O’Reilly»).
6. Грокаем функциональное мышление. — СПб.: Питер, 2023. — 608 с.: ил. —
(Серия «Библиотека программиста»).
7. Разработка на JavaScript. Построение кроссплатформенных приложений
с помощью GraphQL, React, React Native и Electron. — СПб.: Питер, 2021. —
320 с.: ил. — (Серия «Бестселлеры O’Reilly»).
8. React в действии. — СПб.: Питер, 2019. — 368 с.: ил. — (Серия «Для профессионалов»).
9. https://reactnative.dev/docs/getting-started
10. https://reactnative.dev/docs/components-and-apis
11. https://ru.wikipedia.org/wiki/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%9B%D0%B5%D0%B9%D1%82%D0%BD%D0%B5%D1%80%D0%B0
12. https://habr.com/ru/company/vk/blog/501598/
13. https://ru.wikipedia.org/wiki/Мнемоника