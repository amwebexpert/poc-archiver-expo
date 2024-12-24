export const DEMO_TAKE_PICTURE_HTML: string = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>

<body>
  <label for="environment">Capture environment:</label>
  <br>
  <input
    type="file"
    id="environment"
    capture="environment"
    accept="video/*"
  >
  <br><br>
  <label for="user">Capture user:</label>
  <br>
  <input
    type="file"
    id="user"
    capture="user"
    accept="image/*"
  >
</body>

</html>
`
