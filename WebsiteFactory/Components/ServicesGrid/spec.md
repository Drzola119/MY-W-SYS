# Component — ServicesGrid

Grid/list of services or programs. Card content varies slightly by
sub-vertical (see `Templates/<subvertical>.md`) — e.g. dentist cards may
show an icon + short description, gym cards may show a schedule chip,
salon cards show a price range.

Props: `items: [{ name, description, priceRange?, icon? }]`. Never invent
a `priceRange` that research didn't find — omit the field instead of
guessing.
