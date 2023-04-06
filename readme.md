# Werkplaats 3 
Dit is onze web-applicatie voor het inchecken van studenten.

### Dit project is gemaakt met:
- Flask
- JavaScript
- Jinja2
- HTML
- CSS
- AJAX

### Functionaliteiten:
- Inloggen voor docenten
- Studenten kunnen zich zelf inchecken, afmelden & een QR code scannen
- Docent kan een meeting aanmaken, de aanwezigheid van een student aanpassen, een vraag stellen via het inchecken &
een QR code genereren per meeting
- Docent heeft een overzicht van de aanwezigheid van studenten per meeting, 
een overzicht met alle meetings & kan de antwoorden van de studenten zien per meeting
- Docent met admin rechten kan ook admin rechten toewijzen aan een andere docent, kan studenten, klassen en docenten toevoegen &
studenten, klassen en "docenten" "verwijderen"
- Docent met admin rechten kan de database aanpassen

## LET OP!!! :warning::biohazard:
voor het testen van de QR scan vervang ```if __name__ == "__main__":``` met:
```
if __name__ == "__main__":
     ctx = ('zeehond.crt', 'zeehond.key')
    # app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG, ssl_context=ctx)
```
Omdat de camera functionaliteit anders niet aangezet kan worden als het via http gaat.
en zet in de url https.


### Om deze webapplicatie te starten doe dit:
```
pip install virtualenv
virtualenv venv
.\venv\scripts\activate
pip install -r requirements.txt

.\venv\scripts\activate
python app.py
```