import csv
import json
from datetime import datetime


def map_to_json(data):
    result = []
    for holiday in data:
        holiday_date = holiday[0]
        holiday_name = holiday[2]
        holiday_date_obj = datetime.strptime(holiday_date, "%Y-%m-%d")
        holiday_date_formatted = holiday_date_obj.strftime("%m/%d/%Y")

        holiday_item = {
            'date': holiday_date_formatted,
            'name': holiday_name,
            'category': 'REGULAR',
            'country': 'SG'
        }

        result.append(holiday_item)

    return result


sg_holidays_file = open('./holiday-data/public-holidays-for-2023.csv')
reader = csv.reader(sg_holidays_file)
data = list(reader)
without_header_list = data[1:]

result_list = map_to_json(without_header_list)

holiday_file = open('./holiday-data/sg-data.json', 'w')
holiday_file.write(json.dumps(result_list))
holiday_file.close()
