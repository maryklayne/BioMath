# -*- coding: utf-8 -*-

#maryklayne
from django.shortcuts import render
from django.http.response import HttpResponse
import json
import re
from sympy import *
from sympy import discriminant
from sympy.solvers import solve

x = Symbol('x', real=True)
y = Symbol('y')

def home(request):
    return render(request, 'index2.html')

def set(request):
    return render(request, 'index.html')

def funcao1(request):
	campo1 = request.POST["funcao"]

	funcaoUnicode = str(campo1)

	#converter de unicode para sympify
	campo1 = sympify(campo1)

	#delta
	deltaDaFunc = delta(campo1)
	print 'deltaDaFunc ', deltaDaFunc

	# X' e X''
	resultadoFim = xisLinha(campo1)
	primeiroX = 'não possui'
	segundoX =  'não possui'
	print primeiroX
	print resultadoFim, type(resultadoFim)

	if(len(resultadoFim)) == 1:
		primeiroX = str(resultadoFim[0])
	elif(len(resultadoFim)) == 2:
		primeiroX = str(resultadoFim[0])
		segundoX = str(resultadoFim[1])


	dados = json.dumps({'Delta':str(deltaDaFunc),
						'primeiroX':primeiroX,
						'segundoX': segundoX})

	return HttpResponse(dados, content_type='application/json') #retornar lista

#Cálculo dos pontos de intersecção da funcao com o eixo x
def intersecX(funcao):
	retorno = []
	try:
		raizes = solve(funcao, x)

	except:
		raizes = []

	if raizes:
		i = 0
		while i < len(raizes):
			pontos = (i, sympify(funcao).subs(x, i))
			retorno.append(pontos)
			i=i+1
		retorno = str(retorno)[1:-1]
	else:
		retorno.append('nao possui intX')

	return retorno

# Calculo do delta da função
def delta(funcao):
	return discriminant(funcao)

def xisLinha(funcao):
	return solve(funcao)




	

