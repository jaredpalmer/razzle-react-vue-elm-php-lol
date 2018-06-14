module App exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode


type alias Model =
    {counter: Int}


init : ( Model, Cmd Msg )
init =
    ( Model 0, Cmd.none )

decodeModel : Json.Decode.Decoder Model
decodeModel =
    Json.Decode.map Model
        (Json.Decode.field "counter" Json.Decode.int)

-- UPDATE


type Msg
    = Inc


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        Inc ->
            {model | counter = model.counter + 1} ! []

imgStyle : Attribute msg
imgStyle =
  style
    [ ("margin", "0 auto")
    , ("display", "block")
    , ("height", "100px")
    ]

containerStyle : Attribute msg
containerStyle =
  style
    [ ("margin", "0 auto")
    , ("display", "block")
    , ("text-align", "center")
    , ("background", "#eee")
    , ("padding", "2rem")
    ]

-- VIEW


view : Model -> Html Msg
view model =
    div [ containerStyle ]
      [
        img [ imgStyle, src "https://upload.wikimedia.org/wikipedia/commons/f/f3/Elm_logo.svg" ]  []
        , h1 []
            [ text "This is some Elm code!"
            ]
        , p [] [ text "Click on the button below to increment the state." ]
                     
        , div []
            [ button
                [ class "btn btn-primary"
                , onClick Inc
                ]
                [ text "+ 1" ]
            , text <| toString model
            ]
        ]