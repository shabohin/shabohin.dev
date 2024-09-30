import { watchAndGeneratePDF } from '../src/features/PDFGenerator'

const stopWatching = watchAndGeneratePDF()

process.on('SIGINT', () => {
  console.log('Stopping PDF watcher')
  stopWatching()
  process.exit()
})

process.stdin.resume()
