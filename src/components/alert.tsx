import Container from './container'
import cn from 'classnames'

export default function Alert({ }) {
  return (
    <div
      className={cn('border-b', {
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm bg-lightprimary">
            <>
                Velkommen til find bilpleje - Din guide til bilpleje i Danmark           </>
        </div>
      </Container>
    </div>
  )
}
