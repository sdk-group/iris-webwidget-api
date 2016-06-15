

<!-- Start src\booking\index.js -->

## IRIS

## webwidget

## getTerminals()

getTerminals - возвращает все доступные терминалы

### Return:

* **Object** хэш-мап вида:

````
{
    %terminal_id% : {
      label: String - имя терминала
      id: String - id терминала (совпадает с ключом)
    }
}
````

## getTerminalLayout(terminal_id)

getTerminalLayout - возвращает достпные раскладки услуг в виде дерева услуг

### Params:

* **String** *terminal_id* - id терминала

### Return:

* **Object** вида

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
            view_order: Number - порядок усулги слева направо
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

* **Object**

````
[
  {
    date: DateString - дата
    is_available: Boolean - доступен ли день для записи
  }
]
````

## getDaySlots(ticket_query)

getDaySlots - возвращает достпные слоты для записи на указанный день

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

* **Array**

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
  time_description: [ Number, Number] - [начало , конец] запрашеваемого слота в секундах
}
````

### Return:

* **Object**

````
{
    ticket: Object - поля талона
    success: Boolean - статус операции
}
````

<!-- End src\booking\index.js -->
