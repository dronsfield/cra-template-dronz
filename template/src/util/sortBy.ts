function isEmpty(value: any) {
  return Boolean(!value && value !== false)
}

function compareFactory<T>(opts: {
  prop: keyof T
  desc?: boolean
  valueTransform: (x: T[keyof T]) => any
  secondaryProp?: keyof T
}): (left: T, right: T) => number {
  const { prop, desc, valueTransform, secondaryProp } = opts
  const directionTransform = (n: number) => (desc ? -1 : 1) * n
  const secondaryCompare = secondaryProp
    ? compareFactory({ prop: secondaryProp, valueTransform, desc: false })
    : () => 0

  return (left: T, right: T) => {
    let order = 0
    if (isEmpty(left[prop]) && isEmpty(right[prop])) {
      order = secondaryCompare(left, right)
    } else if (isEmpty(left[prop])) {
      order = 1
    } else if (isEmpty(right[prop])) {
      order = -1
    } else {
      const l = valueTransform(left[prop])
      const r = valueTransform(right[prop])
      if (l > r) {
        order = directionTransform(1)
      } else if (l < r) {
        order = directionTransform(-1)
      } else if (l === r) {
        order = secondaryCompare(left, right)
      }
    }
    return order
  }
}

export function sortBy<T>(
  input: T[],
  prop: keyof T,
  desc?: boolean,
  opts?: {
    castLower?: boolean
    secondaryProp?: keyof T
    valueTransform?: (x: T[keyof T]) => any
  }
) {
  const { castLower, secondaryProp, valueTransform: valueTransformProp } =
    opts || {}
  const valueTransform =
    valueTransformProp || castLower
      ? (x: T[keyof T]) => (typeof x === "string" ? x.toLowerCase() : x)
      : (x: T[keyof T]) => x

  const compare = compareFactory({ prop, desc, valueTransform, secondaryProp })

  return [...input].sort(compare)
}
