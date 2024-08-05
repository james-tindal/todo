import { ReactNode } from "react"

interface Props {
  if: unknown
  children?: ReactNode
  then?: ReactNode
  else?: ReactNode
}

export const Show = ({ if: condition, then, else: else_, children }: Props) =>
  condition ? children ?? then : else_
