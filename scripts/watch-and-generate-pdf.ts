import { watchAndGeneratePdf } from '../src/features/PdfGenerator'

const stopWatching = watchAndGeneratePdf()

process.on('SIGINT', () => {
  console.log('Stopping PDF watcher')
  stopWatching()
  process.exit()
})

process.stdin.resume()
