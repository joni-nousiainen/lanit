$(document).ready(function () {

  var urlPrefix = '/api/v1/parties/'
  var selectedParty = localStorage.getItem('party')
  var selectedName = localStorage.getItem('name')

  if (selectedParty && selectedName) {
    $('#party').text(selectedParty)
    $('#name').text(selectedName)

    $('#logout-button').click(function (e) {
      e.preventDefault()
      localStorage.clear()
      window.location.reload()
    })

    var gamesWithVotesUrl = urlPrefix + selectedParty + '/games-with-votes'
    $.get(gamesWithVotesUrl, function(gamesWithVotes) {
      $.each(gamesWithVotes, function(parameterThatIsNotNeeded, game) {
        var row = $('<tr></tr>')

        var gameCol = $('<td></td>')
          .append(
            $('<span></span>')
              .text(game.game)
              .addClass('mr-3')
          )
        row.append(gameCol)

        var functionsCol = $('<td></td>')
        if ($.inArray(selectedName, game.voters) > -1) {
          var noButton = $('<a href="#"></a>')
            .addClass('btn btn-secondary btn-sm')
            .append(
              $('<i class="fa fa-times" aria-hidden="true"></i>')
            )
            .attr('title', 'Muutin mieleni, poista ääni.')
            .click(function(e) {
              e.preventDefault()
              $.post(urlPrefix + selectedParty + '/downvote', {
                gamer: selectedName,
                game: game.game
              }).done(function() {
                window.location.reload()
              })
            })
          functionsCol.append(noButton)
        }
        else {
          var yesButton = $('<a href="#"></a>')
            .addClass('btn btn-primary btn-sm')
            .append(
              $('<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>')
            )
            .attr('title', 'Jee, haluan pelata!')
            .click(function(e) {
              e.preventDefault()
              $.post(urlPrefix + selectedParty + '/upvote', {
                gamer: selectedName,
                game: game.game
              }).done(function() {
                window.location.reload()
              })
            })
          functionsCol.append(yesButton)
        }
        row.append(functionsCol)

        var votesCol = $('<td></td>')
        $.each(game.voters, function(key, name) {
          var voterSpan = $('<span></span>')
            .addClass('voter mr-2 p-1 pl-2 pr-2')
            .text(name)
          if (name == selectedName) {
            voterSpan.addClass('voter-me')
          }
          votesCol.append(voterSpan)
        })
        row.append(votesCol)

        $('#games-table').append(row)
      })
    })

    $('#add-new-game-button').click(function (e) {
      e.preventDefault()

      var newGame = $('#new-game-field').val()
      if (!newGame) {
        alert('Syötä pelin nimi!')
        return
      }

      $.post(urlPrefix + selectedParty + '/games', {
        gamer: selectedName,
        game: newGame
      }).done(function() {
          window.location.reload()
        })
    })

    $('#vote-games-section').removeClass('d-none')
  }
  else if (selectedParty) {
    var gamersUrl = urlPrefix + selectedParty + '/gamers'
    $.get(gamersUrl, function (names) {
      $.each(names, function(key, name) {
        $('#names')
          .append(
            $('<option></option>')
              .attr('value', name)
              .text(name))
      })

      $('#names').change(function (e) {
        selectName($(this).val())
      })

      function selectName(name) {
        localStorage.setItem('name', name)
        window.location.reload()
      }

      $('#add-new-name-link').click(function(e) {
        e.preventDefault()
        $('#add-new-name-section').toggleClass('d-none')
      })

      $('#add-new-name-button').click(function(e) {
        e.preventDefault()

        var newName = $('#new-name-field').val()

        if (!newName) {
          alert('Syötä nimi!')
          return
        }

        for(var i = 0; i < names.length; i++) {
          if (names[i].toLocaleLowerCase() == newName.toLowerCase()) {
            alert('Nimi "' + newName + '" löytyy jo listasta!')
            return
          }
        }

        selectName(newName)
      })

      $('#select-name-section').removeClass('d-none')
    })
  }
  else {
    $('#enter-party-code-section').removeClass('d-none')

    $('#confirm-party-code-button').click(function(e) {
      e.preventDefault()

      var newParty = $('#newParty').val()

      if (!newParty) {
        alert('Syötä tapahtuman koodi!')
        return
      }

      selectParty(newParty)
    })

    function selectParty(party) {
      localStorage.setItem('party', party)
      window.location.reload()
    }
  }

})
