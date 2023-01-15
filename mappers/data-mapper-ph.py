# To run, you must install the necessary imported libraries first
from datetime import datetime
import requests
import bs4
import json


def get_holiday_list(selector, category):
    element = soup.select(selector)[0]
    rows = element.find_all('tr')

    holiday_list = []

    for row in rows:
        cols = row.find_all('td')
        holiday_name = cols[0]
        holiday_date = cols[1]

        holiday_name_stripped = holiday_name.getText().strip()
        holiday_date_stripped = holiday_date.getText().strip()

        holiday_date_arr = holiday_date_stripped.split(' ')

        holiday_month = datetime.strptime(holiday_date_arr[0], '%B').month
        readable_date = str(holiday_month) + '/' + \
            holiday_date_arr[1] + '/' + str(year)

        holiday_item = {
            'date': readable_date,
            'name': holiday_name_stripped,
            'category': category,
            'country': 'PH'
        }

        holiday_list.append(holiday_item)
    return holiday_list


# Could be dynamically set in the future
year = 2023

ph_holidays_url = 'https://www.officialgazette.gov.ph/nationwide-holidays/2023/'
response = requests.get(ph_holidays_url)
response.raise_for_status()

soup = bs4.BeautifulSoup(response.text, 'html.parser')
regular_holidays_selector = '#nationwide-regular-holidays > div > table > tbody'
special_holidays_selector = '#nationwide-special-holidays > div > table > tbody'

regular_holidays_list = get_holiday_list(regular_holidays_selector, 'REGULAR')
special_holidays_list = get_holiday_list(
    special_holidays_selector, 'SPECIAL')

all_ph_holidays = regular_holidays_list + special_holidays_list

holiday_file = open('./holiday-data/ph-data.json', 'w')
holiday_file.write(json.dumps(all_ph_holidays))
holiday_file.close()
