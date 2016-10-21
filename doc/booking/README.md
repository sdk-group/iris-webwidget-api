

<!-- Start src\booking\index.js -->
## Подключение библиотеки предварительной записи

Импортируем скрипт на страницу

````
<script src="http://194.226.171.146/api/webwidget/index.build.js?key=YOUR_API_KEY"></script>
````
После загрузки скрипт добавляет в window пространство имен IRIS, которое содержит пространство имен webwidget с функциями доступа к API предварительной записи.

Например

````
IRIS.webwidget.Terminals().then(data => doStuff(data))
````

Все функции изначально возвращают Promise, в скобках написано значение возвращаемое при резолве. Для совместимости со старыми браузерами может понадобиться использовать полифилы для Promise и window.fetch. Например, https://github.com/stefanpenner/es6-promise или bluebird, https://github.com/github/fetch

## IRIS

## webwidget

## getTerminals()

getTerminals - возвращает все доступные терминалы

### Return:

* **Promise(Object)** хэш-мап вида:

````
{
    %terminal_id% : {
      label: String - имя терминала
      id: String - id терминала (совпадает с ключом)
    }
}
````

## getTerminalLayout(terminal_id)

getTerminalLayout - возвращает доступные раскладки услуг в виде дерева услуг

### Params:

* **String** *terminal_id* - id терминала

### Return:

* **Promise(Object)** вида

````
{
    base:{
      root: { - базовая группа сервисов, этот ключ присутствует всегда
        label: String - название группы
        items_per_page: Number - рекомендуемое к отображению количество элементов на странице
        content: [ - массив содержащихся в группе переходов на услуги и другие группы услуг
          {
            id: String - id группы услуг или услуги
            label: String - название
            type: String - "Service" или "ServiceGroup" в зависимости от того ссылка на группу или услугу
            view_order: Number - порядок услуги слева направо
          }        
        ]
      },
      %ServiceGroup ID% :{ ... } - такая же структура, как и у root
    }
  }
````

Кроме **base** могут опционально присутствовать так же дополнительные варианты отображения услуг (например, по жизненным ситуациям). Раскладка **base** присутствует всегда.

## getAvailableDays(ticket_query)

getAvailableDays - возвращает доступные для записи дни

### Params:

* **Object** *ticket_query* - объект с параметрами запроса

````
{
  service: String - id услуги
  service_count: Number - количество дел
  workstation: String - id терминала, с которого заказывается услуга
  start: Number - начало временного интервала в днях, на который интересует услуга, 0 - текущий день
  end: Number - конец временного интервала в днях
}
````

### Return:

* **Promise(Object)**

````
{
  days :[ - список дней
    {
      date: DateString - дата
      is_available: Boolean - доступен ли день для записи
    }
  ],
  done: Boolean - достигнут ли конец интервала предзаписи
}
````

Поле **done** принимает значение true, если в выдаче присутсвует последний доступный для предзаписи день, иначе false.

## getDaySlots(ticket_query)

getDaySlots - возвращает доступные слоты для записи на указанный день

### Params:

* **Object** *ticket_query* - объект с параметрами запроса

````
{
  service: String - id услуги
  service_count: Number - количество дел
  workstation: String - id терминала, с которого заказывается услуга
  dedicated_date: Date String "YYYY-MM-DD" - день для получения услуги
}
````

### Return:

* **Promise(Array)**

````
[
  {
    time_description: [ Number, Number] - [начало , конец] слота в секундах с начала дня
  }
]
````

## confirmTicket(ticket_query)

confirmTicket - регистрация талона предварительной записи

### Params:

* **Object** *ticket_query* - объект с параметрами запроса

````
{
  service: String - id услуги
  service_count: Number - количество дел
  workstation: String - id терминала, с которого заказывается услуга
  dedicated_date: Date String "YYYY-MM-DD" - день для получения услуги
  time_description: [ Number, Number] - [начало , конец] запрашиваемого слота в секундах
}
````

### Return:

* **Promise(Object)**

````
{
    ticket: [Object] - массив талонов
    success: Boolean - статус операции
}
````

<!-- End src\booking\index.js -->
