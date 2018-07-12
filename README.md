# dataset.now.sh

A **free to use** API to get a lists of various _common datasets_ such as:

- Languages
- Countries

All the endpoints with data are cached using [Now CDN](https://zeit.co/cdn) to give the best performance all the time.

## Endpoints

### Get a list of spoken languages

```http
GET /languages
```

Returns the list of languages as:

```json
{
  "languages": [
    ...
    {
      "name": "Spanish",
      "nativeName": "español",
      "code": "es"
    }
    ...
  ]
}
```

Each language contains its name in English, the native name and the language code.

### Get a list of countries

```http
GET /countries
```

Returns the list of countries as:

```json
{
  "countries": [
    ...
    { "code": "US", "country": "United States" }
    ...
  ]
}
```

Each country contains the name and international code.