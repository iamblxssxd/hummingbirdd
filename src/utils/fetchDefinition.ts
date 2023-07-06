interface WordDefinition {
  id: string
  wordWise: {
    id: string
    fullDefinition: string
    shortDefinition: string
    exampleSentence: string
    hintLevel: string
  }[]
}

export async function fetchDefinition(
  word: string
): Promise<WordDefinition | undefined> {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Vi2frjcdeyIyEUydliMQ3`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word: word }),
  }

  try {
    const response = await fetch(`/api/v1/wordwise`, requestOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error:', error)
  }
}
