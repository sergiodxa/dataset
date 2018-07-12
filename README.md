# languages.now.sh

A free to use API to get a list of "all" the spoken languages, sorted by name, provided as a JSON for use inside any app.

## Endpoints

### `/en` (alias `/`)

Returns the list of languages in English as:

```json
{
  "languages": [...]
}
```

The array contains strings with each language name.