$(document).ready(function () {

  var names = [
    'Antti',
    'Joni',
    'Kimmo',
    'Miksu',
    'Perttu',
    'Rise',
    'Tero',
    'Visa'
  ]

  var gamesAndVotes = {
    'Chivalry': [
      'Joni',
      'Tero',
      'Visa'
    ],
    'Left 4 Dead': [
      'Antti',
      'Joni',
      'Kimmo',
      'Miksu',
      'Perttu',
      'Rise',
      'Tero',
      'Visa'
    ],
    'StarCraft 2': [
      'Antti',
      'Joni'
    ],
    'Team Fortress 2': [
      'Joni',
      'Miksu',
      'Perttu',
      'Tero'
    ],
    'UFO X-Com': []
  }

  var selectedParty = localStorage.getItem('party')
  var selectedName = localStorage.getItem('name')

  if (selectedParty && selectedName) {
    $('#vote-games-section').removeClass('d-none')

    $('#party').text(selectedParty)
    $('#name').text(selectedName)

    $('#logout-button').click(function (e) {
      e.preventDefault()
      localStorage.clear()
      window.location.reload()
    })

    $.each(gamesAndVotes, function(game, voters) {
      var avatars = ''

      var row = $('<tr></tr>')

      var gameCol = $('<td></td>')
        .append(
          $('<span></span>')
            .text(game)
            .addClass('mr-3')
        )
      row.append(gameCol)

      var functionsCol = $('<td></td>')
      if ($.inArray(selectedName, voters) > -1) {
        var noButton = $('<a href="#"></a>')
          .addClass('btn btn-secondary btn-sm')
          .append(
            $('<i class="fa fa-times" aria-hidden="true"></i>')
          )
          .attr('title', 'Muutin mieleni, poista ääni.')
        functionsCol.append(noButton)
      }
      else {
        var yesButton = $('<a href="#"></a>')
          .addClass('btn btn-primary btn-sm')
          .append(
            $('<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>')
          )
          .attr('title', 'Yay, haluan pelata!')
        functionsCol.append(yesButton)
      }
      row.append(functionsCol)

      var votesCol = $('<td></td>')
      $.each(voters, function(key, name) {
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
  }
  else if (selectedParty) {
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
