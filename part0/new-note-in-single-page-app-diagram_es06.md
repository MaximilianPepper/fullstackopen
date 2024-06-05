sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note: the new note is pushed in the document without the server asking for a redirect, the form data is sent by the JS code to the server in JSON format
