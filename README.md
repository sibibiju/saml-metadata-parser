# saml-metadata-parser

## Overview
The SAML metadata Parser hides the intricacies of the SAML protocol behind a simple interface and turns various inputs into objects.

## Usage

```
const metadata = await parser.parseFromFile(idpFilePath, spFilePath, passportConfig);
```

Parameters:
- idpFilePath: Path to IdP xml file (Required)
- spFilePath: Path to SP xml file (Optional)
- passportConfig: Returns object consumable by passport (Optional)

```
const metadata = await parser.parseFromString(xmlString);
```

Parameters:
- xmlString: IdP XML string

## Functionalities to be added/updated in the future
- Support advanced tags and attributes
- Parse SAML metadata from URL
- Unit test cases
