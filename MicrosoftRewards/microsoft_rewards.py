import random
import string
import sys
from selenium import webdriver
from selenium.webdriver import EdgeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


def search(browser, level):
    if level == 1:
        searches = 10
    elif level == 2:
        searches = 30
    else:
        print("Livello inesistente")
        sys.exit(-2)

    browser.get("https://www.bing.com")
    for i in range(searches):
        search_bar = browser.find_element(By.ID, "sb_form_q")
        search_bar.send_keys("".join(random.choice(string.ascii_letters)) + Keys.RETURN)
        print("Searched")


if __name__ == "__main__":
    username = input("Mail > ")
    password = input("Password > ")
    correct = input(f"Parametri corretti? ({username}, {password})? > (s/n) ")

    if correct.lower() == "s":
        options = EdgeOptions()
        options.add_experimental_option("detach", True)
        browser = webdriver.Edge(options=options)
        print("Accedo...")
        browser.get("https://login.live.com")
        try:
            browser.find_element(By.ID, "i0116").send_keys(username + Keys.RETURN)
            password_field = browser.find_element(By.ID, "i0118")
            password_field.send_keys(password + Keys.RETURN)
            print("Accesso effettuato")
            level = int(input("Il tuo livello > "))
            search(browser, level)

        except:
            print("Un account è già connesso")
            level = int(input("Il tuo livello > "))
            search(browser, level)

    else:
        sys.exit(-1)
